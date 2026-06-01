from pydantic import BaseModel
from datetime import datetime

class PatientCreate(BaseModel):
    name: str
    email: str

class DoctorCreate(BaseModel):
    name: str
    specialty: str

class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    date: datetime
