from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, time
from database import SessionLocal
import models, schemas, crud

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create(app: schemas.AppointmentCreate, db: Session = Depends(get_db)):

    # RN01 - passado
    if app.date < datetime.now():
        raise HTTPException(400, "Data inválida")

    # RN04 - horário
    if not (time(8,0) <= app.date.time() <= time(17,0)):
        raise HTTPException(400, "Fora do horário")

    # RN02 - médico ocupado
    if db.query(models.Appointment).filter(
        models.Appointment.doctor_id == app.doctor_id,
        models.Appointment.date == app.date
    ).first():
        raise HTTPException(400, "Médico ocupado")

    # RN03 - paciente ocupado
    if db.query(models.Appointment).filter(
        models.Appointment.patient_id == app.patient_id,
        models.Appointment.date == app.date
    ).first():
        raise HTTPException(400, "Paciente ocupado")

    new_app = models.Appointment(**app.model_dump())
    db.add(new_app)
    db.commit()
    db.refresh(new_app)

    return new_app


@router.get("/")
def list_all(db: Session = Depends(get_db)):
    return crud.get_appointments(db)


@router.delete("/{id}")
def delete(id: int, db: Session = Depends(get_db)):
    result = crud.delete_appointment(db, id)
    if not result:
        raise HTTPException(404, "Consulta não encontrada")
    return {"msg": "Removido"}
