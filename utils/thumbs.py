from os import mkdir, path
from PIL import Image
from glob import glob


def generate_thumbnails():
    total_images = len(glob("static/peptides/images/*.png"))

    if not path.isdir("static/peptides/thumbs"):
        mkdir("static/peptides/thumbs")
    
    for i in range(total_images):
        full_img = Image.open(f"static/peptides/images/Pep{i + 1}.png")
        scaled_img = full_img.resize((300, 300))
        scaled_img.save(f"static/peptides/thumbs/Pep{i + 1}.png", optimize=True, quality=50)
        print(f"Thumb generated: Pep{i + 1}.png")
