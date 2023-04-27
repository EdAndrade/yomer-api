import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { HospitalDto } from '../src/hospital/dto';
import { DoctorDto } from '../src/doctor/dto';

describe('e2e test', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let hospitalId: number
  let doctorId: number
  let patientId: number

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe()
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  //=================MOCKS
  const mocks: {
    doctor: DoctorDto,
    hospital: HospitalDto 
  } = {
    hospital: {
      name: 'Cajueiro',
      email: 'cajueiro@gmail.com',
      location: 'Maianga',
      is_central: false,
      password: 'created',
    },

    doctor: {
      first_name: 'Carlos',
      last_name: 'Garcia',
      email: 'carlos@gmail.com',
      password: '123',
      avatar: 'fdfsa;lkje;lkafjsdlksdf',
      role: 'Cardiologista',
      birthdate: '1988-11-05T00:00:00Z',
      years_of_experience: 20,
      hospitalId: 1
    }
  }
  //END MOCKS================

  describe('Hospital', () => {

    const { hospital } = mocks

    describe('Right path', () => {

      it('Should create account', async () => {
        hospitalId = await pactum
          .spec()
          .post('/hospital/signup')
          .withBody(hospital)
          .returns('id')
          .expectStatus(201);
      });

      it('Should signin', () => {
        return pactum
          .spec()
          .post('/hospital/signin')
          .withBody({
            email: hospital.email,
            password: hospital.password,
          })
          .expectStatus(200) 
          .stores('hospitalToken','token');
      });

      it('Should get hospitals', () => {
        return pactum
          .spec()
          .get('/hospital')
          .withHeaders({
            Authorization: 'Bearer $S{hospitalToken}'
          })
          .expectStatus(200) 
          .expectJsonLength(1);
      });
    });

    describe('Wrong path', () => {
      it('Should return bad request', () => {
        return pactum
          .spec()
          .post('/hospital/signup')
          .withBody({ password: '' })
          .expectStatus(400);
      });

      it('Should return notfound', () => {
        return pactum
          .spec()
          .post('/hospital/signin')
          .withBody({
            email: hospital.email,
            password: 'dasfdfa',
          })
          .expectStatus(404);
      });

      it('Should return unauthorized', () => {
        return pactum
          .spec()
          .get('/hospital')
          .expectStatus(401)
      });
    });
  });

  describe('doctor', () => {
    const { doctor } = mocks
    
    describe('Right path', () => {
      it('Should create account', async () => {
        doctorId = await pactum
          .spec()
          .post('/doctors/signup')
          .withBody({
            ...doctor,
            hospitalId
          })
          .returns('id')
          .expectStatus(201);
      });

      it('Should signin', () => {
        return pactum
          .spec()
          .post('/doctors/signin')
          .withBody({
            email: doctor.email,
            password: doctor.password,
          })
          .stores('doctorToken', 'token')
          .expectStatus(200)
      });

      it('Should get doctors', () => {
        return pactum
          .spec()
          .get('/doctors')
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}'
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });

      it('Should get doctor by id', () => {
        return pactum
          .spec()
          .get(`/doctors/${doctorId}`)
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}'
          })
          .expectStatus(200);
      });

      it('Should get doctors by hospital', () => {
        return pactum
          .spec()
          .get(`/doctors/hospital/${hospitalId}`)
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}'
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });

      it('Should change doctor status', () => {
        return pactum
          .spec()
          .put(`/doctors/${doctorId}/status`) 
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}'
          })
          .withBody({ status: false })
          .expectStatus(200);
      });
    });

    describe('Wrong path', () => {
      it('Should return badrequest', () => {
        return pactum
          .spec()
          .post('/doctors/signup')
          .withBody({})
          .expectStatus(400);
      });

      it('Should return notfound', () => {
        return pactum
          .spec()
          .post('/doctors/sigin')
          .withBody({
            email: doctor.email,
            password: 'dfasd',
          })
          .expectStatus(404);
      });

      it('Should return unauthorized', () => {
        return pactum
          .spec()
          .get('/doctors')
          .expectStatus(401);
      });

      it('Should return notfound', () => {
        return pactum.spec().get('/doctors/3532423')
        .withHeaders({
          Authorization: 'Bearer $S{doctorToken}'
        }).expectStatus(404);
      });

      it('Should return bad request', () => {
        return pactum.spec().get('/doctors/dsfsd')
        .withHeaders({
          Authorization: 'Bearer $S{doctorToken}'
        }).expectStatus(400);
      });
    });
  });
});
