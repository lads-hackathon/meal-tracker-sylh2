import requests, json, uvicorn, sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=['*'])

with open('foods.json', 'rt') as data:
    foods: list[dict] = json.load(data)

KEY = sys.argv[1]
ALL_FOOD_GROUPS = []

for food in foods:
    if food["food_group"] not in ALL_FOOD_GROUPS and food["food_group"]: # make sure the group isn't already present and is not none or empty
        ALL_FOOD_GROUPS.append(food['food_group'])

ALL_FOOD_GROUPS.sort()

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

@app.get('/groups')
def get_food_groups():
    return ALL_FOOD_GROUPS

@app.get('/search')
def search_foods(query, limit: int, groups):
    top_matches = []
    good_matches = []
    next_matches = []
    
    filter_groups = groups.split(',')

    for food in foods:
        food = {
            "name": food["name"],
            "group": food["food_group"],
            "subgroup": food["food_subgroup"],
            "description": food["description"],
            "image": f"https://foodb.ca/system/foods/pictures/{food['id']}/full/{food['id']}.png",
        }

        if food['group'] not in filter_groups:
            continue

        if food['name'].lower() == query.lower():
            top_matches.append(food)
        elif food['name'].lower().startswith(query.lower()):
            good_matches.append(food)
        elif query.lower() in food['name'].lower():
            next_matches.append(food)
        
        if len(top_matches) + len(good_matches) + len(next_matches) > limit:
            break
    
    all = []
    all.extend(top_matches)
    all.extend(good_matches)
    all.extend(next_matches)

    return all

uvicorn.run(app, reload=False, host='0.0.0.0')
