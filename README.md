# **Melo – AI Interview Question Generator**

Melo is a lightweight web-based AI that generates **role-specific interview questions** from a single job title input. It is designed for recruiters, hiring managers, and developers who want fast, structured interview preparation content.

---

## **Features** 

- Clean, minimal UI
- Generates 3 Role-specific and context-aware responsesinterview questions from any job title
- Real-time AI responses via OpenRouter API
- Markdown-rendered output for readability

---

## **How It Works**

1. User enters a job title
2. Input is sent to the API
3. AI model generates 3 tailored interview questions
4. Response is returned and rendered as Markdown
   
---

## **Example Use Case**

Input:
```

Customer Success Manager

```

Output:
```

1. How would you handle a high-value client who is at risk of churning due to unmet expectations?
2. What strategies would you use to improve customer retention in a SaaS environment?
3. Describe how you measure customer success beyond basic satisfaction scores.

````

---

## **Tech Stack**

- HTML5
- CSS3
- Vanilla JavaScript
- OpenRouter API

---

### **Live URL**

https://xyz.com

---

## Note

* API calls may fail due to the following:

  * Invalid API key
  * CORS restrictions (use Live Server)
  * Network interruptions
  * No backend security layer

---

## **Future Improvements**

* Hide API key in production
* Add difficulty levels (Junior / Mid / Senior roles)
* Add question categories (Behavioral, Technical, Situational)
* Save history of generated questions
* Authentication system

---

## **Developer**

**Precious Banigo**

---

## License

MIT License — free to use, modify, and distribute.

```

