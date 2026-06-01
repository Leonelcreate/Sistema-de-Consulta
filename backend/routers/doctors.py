from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import schemas, crud

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create(doctor: schemas.DoctorCreate, db: Session = Depends(get_db)):
    return crud.create_doctor(db, doctor)

@router.get("/")
def list_all(db: Session = Depends(get_db)):
    return crud.get_doctors(db)
