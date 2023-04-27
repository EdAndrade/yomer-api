import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { HospitalDto } from '../src/hospital/dto';
import { DoctorDto } from '../src/doctor/dto';
import { PatientDto } from 'src/patient/dto';
import { MedicalRegistrationDto } from 'src/medical_registration/dto';

describe('e2e test', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let hospitalId: number;
  let doctorId: number;
  let patientId: number;
  const doctorPath = '/doctors';
  const patientPath = '/patient';
  const hospitalPath = '/hospital';
  const medicalRegistrationPath = '/medical_registration';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
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
    doctor: DoctorDto;
    hospital: HospitalDto;
    patient: PatientDto;
    medical_registration: MedicalRegistrationDto;
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
      hospitalId: 1,
    },

    patient: {
      first_name: 'Carlos',
      last_name: 'Garcia',
      phone_number: '999999999',
      birthdate: '1988-11-05T00:00:00Z',
      password: '123',
      doctorId: 1,
      medical_registration: '',
    },

    medical_registration: {
      gender: false,
      relative_asma: false,
      relative_cancer: false,
      relative_cardiac_disease: false,
      relative_diabetes: false,
      relative_hypertension: false,
      relative_psychiatric_disorder: false,
      relative_epilepsy: false,
      relative_allergy: false,
      relative_bronchitis: false,
      relative_other: false,
      relative_describe_other: false,
      taking_medications: false,
      medications_description: '',
      allergies: false,
      allergies_description: '',
      use_tobacco: false,
      use_illegal_drugs: false,
      illegal_drugs_family_historic: false,
      consume_alcohol: false,
      cronical_disease: false,
      describe_cronical_disease: '',
      pastweeks_health_description: '',
    },
  };
  //END MOCKS================

  describe('Hospital', () => {
    const { hospital } = mocks;

    describe('Right path', () => {
      it('Should create account', async () => {
        hospitalId = await pactum
          .spec()
          .post(`${hospitalPath}/signup`)
          .withBody(hospital)
          .returns('id')
          .expectStatus(201);
      });

      it('Should signin', () => {
        return pactum
          .spec()
          .post(`${hospitalPath}/signin`)
          .withBody({
            email: hospital.email,
            password: hospital.password,
          })
          .expectStatus(200)
          .stores('hospitalToken', 'token');
      });

      it('Should get hospitals', () => {
        return pactum
          .spec()
          .get(`${hospitalPath}`)
          .withHeaders({
            Authorization: 'Bearer $S{hospitalToken}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Wrong path', () => {
      it('Should return bad request', () => {
        return pactum
          .spec()
          .post(`${hospitalPath}/signup`)
          .withBody({ password: '' })
          .expectStatus(400);
      });

      it('Should return notfound', () => {
        return pactum
          .spec()
          .post(`${hospitalPath}/signin`)
          .withBody({
            email: hospital.email,
            password: 'dasfdfa',
          })
          .expectStatus(404);
      });

      it('Should return unauthorized', () => {
        return pactum.spec().get(`${hospitalPath}`).expectStatus(401);
      });
    });
  });

  describe('doctor', () => {
    const { doctor } = mocks;

    describe('Right path', () => {
      it('Should create account', async () => {
        doctorId = await pactum
          .spec()
          .post(`${doctorPath}/signup`)
          .withBody({
            ...doctor,
            hospitalId,
          })
          .returns('id')
          .expectStatus(201);
      });

      it('Should signin', () => {
        return pactum
          .spec()
          .post(`${doctorPath}/signin`)
          .withBody({
            email: doctor.email,
            password: doctor.password,
          })
          .stores('doctorToken', 'token')
          .expectStatus(200);
      });

      it('Should get doctors', () => {
        return pactum
          .spec()
          .get(`${doctorPath}`)
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });

      it('Should get doctor by id', () => {
        return pactum
          .spec()
          .get(`${doctorPath}/${doctorId}`)
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}',
          })
          .expectStatus(200);
      });

      it('Should get doctors by hospital', () => {
        return pactum
          .spec()
          .get(`${doctorPath}/hospital/${hospitalId}`)
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });

      it('Should change doctor status', () => {
        return pactum
          .spec()
          .put(`${doctorPath}/${doctorId}/status`)
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}',
          })
          .withBody({ status: false })
          .expectStatus(200);
      });
    });

    describe('Wrong path', () => {
      it('Should return badrequest', () => {
        return pactum
          .spec()
          .post(`${doctorPath}/signup`)
          .withBody({})
          .expectStatus(400);
      });

      it('Should return notfound', () => {
        return pactum
          .spec()
          .post(`${doctorPath}/signin`)
          .withBody({
            email: doctor.email,
            password: 'dfasd',
          })
          .expectStatus(404);
      });

      it('Should return unauthorized', () => {
        return pactum.spec().get(`${doctorPath}`).expectStatus(401);
      });

      it('Should return notfound', () => {
        return pactum
          .spec()
          .get(`${doctorPath}/3532423`)
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}',
          })
          .expectStatus(404);
      });

      it('Should return bad request', () => {
        return pactum
          .spec()
          .get(`${doctorPath}/dsfsd`)
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}',
          })
          .expectStatus(400);
      });
    });
  });

  describe('patient', () => {
    const { patient } = mocks;

    describe('Right path', () => {
      it('Should create account', async () => {
        patientId = await pactum
          .spec()
          .post(`${patientPath}/signup`)
          .withBody({
            ...patient,
            doctorId,
          })
          .returns('id')
          .expectStatus(201);
      });

      it('Should signin', () => {
        return pactum
          .spec()
          .post(`${patientPath}/signin`)
          .withBody({
            phone_number: patient.phone_number,
            password: patient.password,
          })
          .stores('patientToken', 'token')
          .expectStatus(200);
      });

      it('Should get patients', () => {
        return pactum
          .spec()
          .get(`${patientPath}`)
          .withHeaders({
            Authorization: 'Bearer $S{patientToken}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });

      it('Should get patient by id', () => {
        return pactum
          .spec()
          .get(`${patientPath}/${patientId}`)
          .withHeaders({
            Authorization: 'Bearer $S{patientToken}',
          })
          .expectStatus(200);
      });
    });

    describe('Wrong path', () => {
      it('Should return badrequest', () => {
        return pactum
          .spec()
          .post(`${patientPath}/signup`)
          .withBody({})
          .expectStatus(400);
      });

      it('Should return notfound', () => {
        return pactum
          .spec()
          .post(`${patientPath}/signin`)
          .withBody({
            phone_number: patient.phone_number,
            password: 'dfasd',
          })
          .expectStatus(404);
      });

      it('Should return unauthorized', () => {
        return pactum.spec().get(`${patientPath}`).expectStatus(401);
      });

      it('Should return notfound', () => {
        return pactum
          .spec()
          .get(`${patientPath}/3532423`)
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}',
          })
          .expectStatus(404);
      });

      it('Should return bad request', () => {
        return pactum
          .spec()
          .get(`${patientPath}/dsfsd`)
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}',
          })
          .expectStatus(400);
      });
    });
  });

  describe('Medical Registration', () => {
    const { medical_registration } = mocks

    describe('Right path', () => {
      it('Should return create medical registration', () => {
        return pactum
          .spec()
          .post(`${medicalRegistrationPath}/patient/${patientId}`)
          .withBody(medical_registration)
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}',
          })
          .stores('medical_registrationId', 'id')
          .expectStatus(201);
      });
  
      it('Should update medical registration', () => {
        return pactum
          .spec()
          .put(`${medicalRegistrationPath}/{id}`) 
          .withBody({
            ...medical_registration,
            use_tobacco: true
          })
          .withPathParams('id', '$S{medical_registrationId}')
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}',
          })
          .expectStatus(200);
      });
    })

    describe('Wrong path', () => {
      it('Should return bad request', () => {
        return pactum
          .spec()
          .post(`${medicalRegistrationPath}/patient/${patientId}`)
          .withBody({
            ...medical_registration,
            use_tobacco: ''
          })
          .withHeaders({
            Authorization: 'Bearer $S{doctorToken}',
          })
          .expectStatus(400);
      }); 
  
      it('Should return not found', () => {
        return pactum
          .spec()
          .put(`${medicalRegistrationPath}/60765`)
          .withBody(medical_registration)
          .withHeaders({ 
            Authorization: 'Bearer $S{doctorToken}',
          })
          .expectStatus(404);
      });
    })
  })
});
