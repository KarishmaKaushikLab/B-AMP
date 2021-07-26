from os import mkdir, path, listdir
from PIL import Image
from glob import glob


def generate_thumbnails():
    image_files = listdir("static/peptides/images/")

    if not path.isdir("static/peptides/thumbs"):
        mkdir("static/peptides/thumbs")

    for image_file in image_files:
        full_img = Image.open(f"static/peptides/images/{image_file}")
        scaled_img = full_img.resize((300, 300))
        scaled_img.save(
            f"static/peptides/thumbs/{image_file}", optimize=True, quality=50
        )
        print(f"Thumb generated: {image_file}")

    print(f"Successfully generated {len(image_files)} thumbs.")


def generate_docked_thumbnails():
    image_files = listdir("static/peptides/docked/images/")

    if not path.isdir("static/peptides/docked/thumbs"):
        mkdir("static/peptides/docked/thumbs")

    for image_file in image_files:
        full_img = Image.open(f"static/peptides/docked/images/{image_file}")
        scaled_img = full_img.resize((400, 192))
        scaled_img.save(
            f"static/peptides/docked/thumbs/{image_file}", optimize=True, quality=50
        )
        print(f"Thumb generated: {image_file}")

    print(f"Successfully generated {len(image_files)} thumbs.")


def generate_sortase_thumbnail():
    full_img = Image.open(f"static/sortase/M_Ala_Sortase.png")
    scaled_img = full_img.resize((400, 355))
    scaled_img.save(
        f"static/sortase/M_Ala_Sortase_Thumb.png", optimize=True, quality=50
    )

    print(f"Successfully generated Sortase thumb.")
