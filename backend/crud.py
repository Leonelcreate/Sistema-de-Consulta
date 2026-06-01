from sqlalchemy.orm import Session
import models, schemas

# ---------------- PATIENTS ----------------
def create_patient(db: Session, patient: schemas.PatientCreate):
    db_patient = models.Patient(**patient.model_dump())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

def get_patients(db: Session):
    return db.query(models.Patient).all()


# ---------------- DOCTORS ----------------
def create_doctor(db: Session, doctor: schemas.DoctorCreate):
    db_doctor = models.Doctor(**doctor.model_dump())
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor

def get_doctors(db: Session):
    return db.query(models.Doctor).all()


# ---------------- APPOINTMENTS ----------------
def get_appointments(db: Session):
    return db.query(models.Appointment).all()

def delete_appointment(db: Session, appointment_id: int):
    appointment = db.query(models.Appointment).get(appointment_id)
    if appointment:
        db.delete(appointment)
        db.commit()
    return appointment
