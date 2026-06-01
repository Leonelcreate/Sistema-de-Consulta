def test_create_patient(test_client):
    response = test_client.post("/patients/", json={
        "name": "Teste",
        "email": "teste@email.com"
    })

    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Teste"


def test_list_patients(test_client):
    response = test_client.get("/patients/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)