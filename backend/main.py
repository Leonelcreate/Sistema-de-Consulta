from fastapi import FastAPI
from database import Base, engine
from routers import patients, doctors, appointments

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(patients.router, prefix="/patients", tags=["Patients"])
app.include_router(doctors.router, prefix="/doctors", tags=["Doctors"])
app.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])
