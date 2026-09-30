from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for simplicity
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample event data
events_data = [
    {"id": 1, "title": "Intro to Web Development", "date": "2026-10-05", "location": "Room 101"},
    {"id": 2, "title": "Python for Beginners", "date": "2026-10-10", "location": "Online"},
    {"id": 3, "title": "Hackathon Kickoff", "date": "2026-10-15", "location": "Main Hall"},
]

# Pydantic model for registration data
class StudentRegistration(BaseModel):
    name: str
    email: str

@app.get("/api/events")
def get_events():
    """Returns a list of upcoming technical events."""
    return events_data

@app.post("/api/register")
def register_student(student: StudentRegistration):
    """Registers a student for the Tech Hub."""
    # In a real app, you would save this to a database
    print(f"Registered student: {student.name} ({student.email})")
    return {"message": f"Successfully registered {student.name}!", "student": student.dict()}
