import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_auth_lifecycle():
    # 1. Check unauthenticated initial state
    res_me = client.get("/api/v1/auth/me")
    assert res_me.status_code == 200
    assert res_me.json()["authenticated"] is False

    # 2. Login with credentials
    login_payload = {
        "email": "security.lead@acme.corp",
        "role": "SOC Lead",
        "password": "demo_password"
    }
    res_login = client.post("/api/v1/auth/login", json=login_payload)
    assert res_login.status_code == 200
    assert res_login.json()["status"] == "authenticated"
    assert res_login.json()["user"]["email"] == "security.lead@acme.corp"
    assert res_login.json()["user"]["role"] == "SOC Lead"
    
    # Cookie should be set in client
    assert "access_token" in client.cookies

    # 3. Check authenticated state with cookie
    res_me_auth = client.get("/api/v1/auth/me")
    assert res_me_auth.status_code == 200
    assert res_me_auth.json()["authenticated"] is True
    assert res_me_auth.json()["user"]["email"] == "security.lead@acme.corp"
    assert res_me_auth.json()["user"]["role"] == "SOC Lead"

    # 4. Logout
    res_logout = client.post("/api/v1/auth/logout")
    assert res_logout.status_code == 200
    assert res_logout.json()["status"] == "logged_out"

    # 5. Check unauthenticated state after logout
    res_me_logged_out = client.get("/api/v1/auth/me")
    assert res_me_logged_out.status_code == 200
    assert res_me_logged_out.json()["authenticated"] is False
