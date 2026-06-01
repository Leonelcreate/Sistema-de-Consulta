def test_create_doctor(test_client):
    response = test_client.post("/doctors/", json={
        "name": "Dr Teste",
        "specialty": "Cardiologia"
    })

    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Dr Teste"