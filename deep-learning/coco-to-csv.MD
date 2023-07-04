```py
import json
import csv

def load_coco_json(file_path):
    with open(file_path, 'r') as f:
        coco_data = json.load(f)
    return coco_data

def save_to_csv(data, file_path):
    with open(file_path, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["file_name", "bbox"])
        writer.writerows(data)

coco_file_path = '_annotations.coco.json'
coco_data = load_coco_json(coco_file_path)

images = coco_data['images']
annotations = coco_data['annotations']

data = []
for image, annotation in zip(images, annotations):
    file_name = image['file_name']
    bbox = annotation['bbox']
    data.append([file_name, bbox])

csv_file_path = 'output.csv'
save_to_csv(data, csv_file_path)
```
