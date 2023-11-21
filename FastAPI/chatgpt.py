from openai import OpenAI
import pandas as pd

client = OpenAI()

def get_resp(df):
  file_content = df[:50].to_string(index=False)

  response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
      {"role": "user", "content": "Provide a summary about this dataset. Response should be a paragraph about 4-5 sentences. \n\n" + file_content}
    ]
  )

  summary = response.choices[0].message.content

  response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
      {"role": "user", "content": "Provide some tips/recommendations to avoid bias in this dataset. Response should be a paragraph about 3-4 sentences. \n\n" + file_content}
    ]
  )

  tips = response.choices[0].message.content

  return summary, tips