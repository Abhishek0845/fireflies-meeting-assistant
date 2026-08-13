import pdfplumber

with pdfplumber.open(r'D:\fireflies-clone\Scaler_SDE_Fullstack_Assignment_-_Fireflies_Clone.pdf') as pdf:
    for i, page in enumerate(pdf.pages):
        print(f'--- PAGE {i+1} ---')
        print(page.extract_text())
        print()
