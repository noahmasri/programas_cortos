import os
import sys
import PyPDF2

def merge_pdfs(output_path, folder_path='.'):
    pdf_writer = PyPDF2.PdfWriter()

    for filename in os.listdir(folder_path):
        if not filename.endswith('.pdf'):
            continue

        file_path = os.path.join(folder_path, filename)
        with open(file_path, 'rb') as pdf_file:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            for page_num in range(len(pdf_reader.pages)):
                page = pdf_reader.pages[page_num]
                pdf_writer.add_page(page)

    with open(output_path, 'wb') as output_file:
        pdf_writer.write(output_file)

if __name__ == "__main__":
    if len(sys.argv) == 2 :
        merge_pdfs(sys.argv[1])
    elif len(sys.argv) == 3:
        merge_pdfs(sys.argv[1], sys.argv[2])
    else:
        print("Usage: python concatenate_pdfs.py <output_path> [folder_path]")
        sys.exit(1)