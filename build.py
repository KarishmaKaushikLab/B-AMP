from utils import index, image

if __name__ == "__main__":
    index.build_dramp_to_pep_index()
    index.build_pep_to_dramp_index()
    index.build_pep_to_activity_index()

    image.generate_thumbnails()
