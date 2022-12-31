import requests, json, os, uvicorn, sys
from fastapi import FastAPI

app = FastAPI()
KEY = sys.argv[1]

@app.get("/")
async def root(food):
    url = "https://calorieninjas.p.rapidapi.com/v1/nutrition"

    querystring = {"query":food}

    headers = {
        "X-RapidAPI-Key": KEY,
        "X-RapidAPI-Host": "calorieninjas.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    info_obj = json.loads(response.text)
    dump = json.dumps(info_obj["items"], indent=2)
    
    item_info = info_obj["items"][0]
    f_dict = { # conversion to schema
        "name":item_info["name"],
        "nutrition": {
          "calories": item_info["calories"],
          "total_fat_grams": item_info["fat_total_g"],
          "saturated_fat_grams": item_info["fat_saturated_g"],
          "cholesterol_milligrams": item_info["cholesterol_mg"],
          "sodium_milligrams":  item_info["sodium_mg"],
          "total_carb_grams": item_info["carbohydrates_total_g"],
          "dietary_fiber_grams": item_info["fiber_g"],
          "sugars_grams": item_info["sugar_g"],
          "proteins_grams": item_info["protein_g"],
          "potassium_milligrams": item_info["potassium_mg"],
        }
    }

    return f_dict

uvicorn.run(app, reload=False)
