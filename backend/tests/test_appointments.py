from datetime import datetime, timedelta


def test_create_valid_appointment(test_client):
    # criar paciente
    p = test_client.post("/patients/", json={
        "name": "Paciente Teste",
        "email": "p@test.com"
    }).json()

    # criar médico
    d = test_client.post("/doctors/", json={
        "name": "Dr Teste",
        "specialty": "Geral"
    }).json()

    # criar consulta válida
    response = test_client.post("/appointments/", json={
        "patient_id": p["id"],
        "doctor_id": d["id"],
        "date": (datetime.now() + timedelta(days=1)).replace(hour=10).isoformat()
    })

    assert response.status_code == 200


def test_appointment_in_past(test_client):
    response = test_client.post("/appointments/", json={
        "patient_id": 1,
        "doctor_id": 1,
        "date": "2020-01-01T10:00:00"
    })

    assert response.status_code == 400


def test_appointment_outside_hours(test_client):
    response = test_client.post("/appointments/", json={
        "patient_id": 1,
        "doctor_id": 1,
        "date": (datetime.now() + timedelta(days=1)).replace(hour=20).isoformat()
    })

    assert response.status_code == 400