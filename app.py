import streamlit as st

# Set page config
st.set_page_config(page_title="My Portfolio", layout="wide")

st.title("My Portfolio")

# Read the HTML file
with open("index.html", "r", encoding="utf-8") as f:
    html_content = f.read()

# Display the HTML content
st.components.v1.html(html_content, height=800, scrolling=True)

st.write("---")
st.write("This portfolio is powered by Streamlit.")
