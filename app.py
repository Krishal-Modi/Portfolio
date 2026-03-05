st.title("My Portfolio")
st.write("---")
st.write("This portfolio is powered by Streamlit.")
import streamlit as st
import os

st.set_page_config(page_title="My Portfolio", layout="wide")

# Helper to read file content
def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

# Read HTML, CSS, JS
html_content = read_file("index.html")
css_content = read_file("styles.css")
js_content = read_file("main.js")

# Fix resource paths for images (Streamlit runs from root)
html_content = html_content.replace('src="./resources/', 'src="resources/')
html_content = html_content.replace('href="./styles.css"', '')  # Remove link to external CSS

# Inline CSS and JS
custom_html = f"""
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <style>{css_content}</style>
</head>
<body>
{html_content}
<script>{js_content}</script>
</body>
"""

st.components.v1.html(custom_html, height=1200, scrolling=True)

st.write("---")
st.caption("This portfolio is powered by Streamlit. If images or icons do not load, check resource paths and hosting settings.")
