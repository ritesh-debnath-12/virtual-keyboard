from fastapi import FastAPI, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"], 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"],
    )

# Life could be a dream (sh-boom)

@app.post("/save-text")
async def get_text_area_content_and_save(text: str = Form()):
    # Defining file path
    file_path = "text_data.txt"

    # Writing text contents
    with open(file_path, "w") as file:
        file.write(text)
    
    # Returning file as txt
    return FileResponse(file_path, media_type="application/octet-stream", filename=file_path)

if __name__ == "__main__":
    import uvicorn
    try:
        print("All systems nominal!")
        print("Server is running on http://localhost:3000/")
        uvicorn.run(app, host="127.0.0.1", port=3000)
    except Exception as e:
        print("Issue with running server: ", e)