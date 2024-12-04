from transformers import AutoTokenizer, AutoModelForQuestionAnswering, pipeline

tokenizer = AutoTokenizer.from_pretrained("bert-large-uncased-whole-word-masking-finetuned-squad")
model = AutoModelForQuestionAnswering.from_pretrained("bert-large-uncased-whole-word-masking-finetuned-squad")

qa_pipeline = pipeline("question-answering", model=model, tokenizer=tokenizer)

website_content = {
    "create_trip": {
        "text": (
            "Plan your journey effortlessly with our 'Create Trip' feature. "
            "Customize your travel itinerary, select destinations, and set preferences tailored to your needs."
        ),
        "url": "https://wanderways-travel.netlify.app/create"
    },
    "login": {
        "text": (
            "Already have an account? Login to access your profile, manage trips, and enjoy a personalized experience."
        ),
        "url": "https://wanderways-travel.netlify.app/login"
    },
    "signup": {
        "text": (
            "New to our platform? Sign up to create your account and unlock exclusive features for planning your trips."
        ),
        "url": "https://wanderways-travel.netlify.app/signup"
    },
    "search_trip": {
        "text": (
            "Looking for your next adventure? Use our 'Search Trip' tool to discover exciting destinations, compare travel options, and find the best fit for your plans."
        ),
        "url": "https://wanderways-travel.netlify.app/"
    },
    "book_trip": {
        "text": (
            "Click on the Trip you want too book, scroll and press the 'Book Your Trip Now' button to Book the trip. Confirm reservations and enjoy a hassle-free booking experience."
        ),
        "url": "https://wanderways-travel.netlify.app/"
    },
    "cancel_trip": {
        "text": (
            "Change of plans? No problem. Use our 'Cancel Trip' in the 'My Trips' section to cancel your trip."
        ),
        "url": "https://wanderways-travel.netlify.app/my-trips"
    },
    "my_trips": {
        "text": (
            "View your travel history and manage past bookings with the 'My Trips' feature."
            "Easily view your planned trips. Check your itinerary details, confirm schedules, and ensure everything is on track for your journey."
        ),
        "url": "https://wanderways-travel.netlify.app/my-trips"
    },
    "update_profile": {
        "text": (
            "Keep your information up to date with our 'Update User Profile' feature. "
            "Ensure your preferences and contact details are always current for a seamless experience."
        ),
        "url": "hhttps://wanderways-travel.netlify.app/profile"
    },
}

query_keywords = {
    "create_trip": ["create trip", "plan journey", "itinerary", "customize trip", "travel preferences"],
    "login": ["login", "access account", "sign in", "existing user", "member login"],
    "signup": ["signup", "register", "new account", "join", "create account"],
    "search_trip": ["search trip", "discover", "explore", "destinations", "travel options"],
    "book_trip": ["book trip", "booking", "reserve", "confirm travel", "secure trip", "book"],
    "cancel_trip": ["cancel trip", "change plans", "adjust bookings", "cancel reservation"],
    "my_trips": ["my trips", "travel history", "past bookings", "journey records", "trip overview", "view trip", "itinerary", "details", "planned trips", "journey schedule"],
    "update_profile": ["update profile", "user profile", "update information", "preferences", "contact details"],
}



def preprocess_query(query):
    for section, keywords in query_keywords.items():
        if any(keyword in query.lower() for keyword in keywords):
            return section
    return None

def keyword_search(user_query):
    for section, content in website_content.items():
        if any(word in content['text'].lower() for word in user_query.lower().split()):
            return section
    return None

def get_relevant_link_llm(user_query):
    preprocessed_section = preprocess_query(user_query)
    if preprocessed_section:
        content = website_content[preprocessed_section]
        result = qa_pipeline({'question': user_query, 'context': content['text']})
        if result['score'] > 0.1:
            return f"{result['answer']} Here’s a link to our {preprocessed_section} page: {content['url']}"
        else:
            return "I couldn't confidently find an answer. Can you try rephrasing?"

    best_answer = None
    best_score = 0
    debug_scores = []
    
    for section, content in website_content.items():
        result = qa_pipeline({'question': user_query, 'context': content['text']})
        debug_scores.append((section, result['score'], result['answer']))
        
        if result['score'] > best_score and result['score']:
            best_score = result['score']
            best_answer = {
                'answer': result['answer'],
                'link': content['url'],
                'section': section
            }
    
    print(f"Debug Scores: {debug_scores}")
    
    if not best_answer:
        fallback_section = keyword_search(user_query)
        if fallback_section:
            return f"Here’s a link to our {fallback_section} page: {website_content[fallback_section]['url']}"
        else:
            return "I'm sorry, I couldn't find what you're looking for. Can you try rephrasing?"
    
    return f"{best_answer['answer']} Here’s a link to our {best_answer['section']} page: {best_answer['link']}"

if __name__ == "__main__":
    print("Welcome to our website assistant! Ask me anything.")
    while True:
        user_query = input("You: ")
        if user_query.lower() in ["exit", "quit", "bye"]:
            print("Bot: Goodbye! Have a great day!")
            break
        response = get_relevant_link_llm(user_query)
        print(f"Bot: {response}")
