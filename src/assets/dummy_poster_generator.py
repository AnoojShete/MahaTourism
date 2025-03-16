from PIL import Image, ImageDraw, ImageFont

# List of image filenames (destination names)
file_names = [
    'aga_khan_palace.jpg', 'ajanta_caves.jpg', 'alibaug_beach.jpg', 'bhaja.jpg', 'bhandardara.jpg',
    'bibikamaqbara.jpg', 'chand_minar.jpg', 'daulatabad.jpg', 'elephanta_caves.jpg', 'gateway_india.jpg',
    'karla.jpg', 'kolhapur.jpg', 'lohagad.jpg', 'lonar.jpg', 'lonavala.jpg', 'mahabaleshwar.jpg',
    'maldhok.jpg', 'matheran.jpg', 'murudjanjira.jpg', 'panchgani.jpg', 'panhala.jpg', 'raigad.jpg',
    'shani.jpg', 'shaniwar_wada.jpg', 'shirdi.jpg', 'sinhagad.jpg', 'sula_vineyards.jpg', 'tadoba_park.jpg',
    'trimbakeshwar_temple.jpg', 'vijaydurg.jpg'
]

# Define the dimensions of the image
width, height = 474, 842

# Define font for adding text (use a basic built-in font)
font = ImageFont.load_default()

# Create and save a black image for each filename with text
for destination in file_names:
    # Create a black image (RGB mode, black background)
    img = Image.new('RGB', (width, height), color='black')
    
    # Create a drawing object
    draw = ImageDraw.Draw(img)
    
    # Calculate text size and position to center it using textbbox
    bbox = draw.textbbox((0, 0), destination, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Calculate the position to center the text
    position = ((width - text_width) // 2, (height - text_height) // 2)
    
    # Add text to the image (white text color)
    draw.text(position, destination, fill='white', font=font)
    
    # Save the image with the respective filename
    img.save(destination)

print("Dummy black images with destination names have been created and saved.")
