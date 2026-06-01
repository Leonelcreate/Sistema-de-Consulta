from sqlalchemy.orm import Session

import models
import schemas

from security import hash_password


# ==================================================
# PATIENTS
# ==================================================

def create_patient(
    db: Session,
    patient: schemas.PatientCreate
):

    db_patient = models.Patient(
        **patient.model_dump()
    )

    db.add(db_patient)

    db.commit()

    db.refresh(db_patient)

    return db_patient


def get_patients(
    db: Session
):

    return (
        db.query(models.Patient)
        .all()
    )


# ==================================================
# DOCTORS
# ==================================================

def create_doctor(
    db: Session,
    doctor: schemas.DoctorCreate
):

    db_doctor = models.Doctor(
        **doctor.model_dump()
    )

    db.add(db_doctor)

    db.commit()

    db.refresh(db_doctor)

    return db_doctor


def get_doctors(
    db: Session
):

    return (
        db.query(models.Doctor)
        .all()
    )


# ==================================================
# APPOINTMENTS
# ==================================================

def create_appointment(
    db: Session,
    appointment: schemas.AppointmentCreate
):

    db_appointment = models.Appointment(
        **appointment.model_dump()
    )

    db.add(db_appointment)

    db.commit()

    db.refresh(db_appointment)

    return db_appointment


def get_appointments(
    db: Session
):

    return (
        db.query(models.Appointment)
        .all()
    )


def get_appointment_by_id(
    db: Session,
    appointment_id: int
):

    return (
        db.query(models.Appointment)
        .filter(
            models.Appointment.id == appointment_id
        )
        .first()
    )


def get_appointments_by_doctor(
    db: Session,
    doctor_id: int
):

    return (
        db.query(models.Appointment)
        .filter(
            models.Appointment.doctor_id == doctor_id
        )
        .all()
    )


def get_appointments_by_patient(
    db: Session,
    patient_id: int
):

    return (
        db.query(models.Appointment)
        .filter(
            models.Appointment.patient_id == patient_id
        )
        .all()
    )


def approve_appointment(
    db: Session,
    appointment_id: int
):

    appointment = get_appointment_by_id(
        db,
        appointment_id
    )

    if appointment:

        appointment.status = "APPROVED"

        db.commit()

        db.refresh(
            appointment
        )

    return appointment


def reject_appointment(
    db: Session,
    appointment_id: int
):

    appointment = get_appointment_by_id(
        db,
        appointment_id
    )

    if appointment:

        appointment.status = "REJECTED"

        db.commit()

        db.refresh(
            appointment
        )

    return appointment


def complete_appointment(
    db: Session,
    appointment_id: int
):

    appointment = get_appointment_by_id(
        db,
        appointment_id
    )

    if appointment:

        appointment.status = "COMPLETED"

        db.commit()

        db.refresh(
            appointment
        )

    return appointment


def delete_appointment(
    db: Session,
    appointment_id: int
):

    appointment = (
        db.query(models.Appointment)
        .filter(
            models.Appointment.id == appointment_id
        )
        .first()
    )

    if appointment:

        db.delete(
            appointment
        )

        db.commit()

    return appointment


# ==================================================
# USERS
# ==================================================

def create_user(
    db: Session,
    user: schemas.UserCreate
):

    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(
            user.password
        ),
        role=user.role
    )

    db.add(db_user)

    db.commit()

    db.refresh(db_user)

    return db_user


def get_user_by_email(
    db: Session,
    email: str
):

    return (
        db.query(models.User)
        .filter(
            models.User.email == email
        )
        .first()
    )


def get_user_by_id(
    db: Session,
    user_id: int
):

    return (
        db.query(models.User)
        .filter(
            models.User.id == user_id
        )
        .first()
    )


def get_users(
    db: Session
):

    return (
        db.query(models.User)
        .all()
    )


def delete_user(
    db: Session,
    user_id: int
):

    user = (
        db.query(models.User)
        .filter(
            models.User.id == user_id
        )
        .first()
    )

    if user:

        db.delete(user)

        db.commit()

    return user
