#!/usr/bin/env python3
"""
Adaptive Elo Quiz — Python CLI
- Topics & subjects similar to the mobile app
- 5-question "match" with adaptive question selection around player's ELO
- MCQ only for demo (numeric support can be added easily)
Run: python main.py
"""

import random, sys, time

SUBJECTS = {
    "math": {
        "title": "Math",
        "topics": [
            {"id": "trig", "name": "Trigonometry"},
            {"id": "precalc", "name": "Pre-Calculus"},
            {"id": "calc1", "name": "Calculus I"},
            {"id": "linalg", "name": "Linear Algebra"},
        ],
    },
    "coding": {
        "title": "Coding",
        "topics": [
            {"id": "code_puzzles", "name": "Coding Puzzles"},
            {"id": "debug", "name": "Debug Quizzes"},
            {"id": "mini_hack", "name": "Mini-Hackathons"},
        ],
    },
    "physics": {
        "title": "Physics",
        "topics": [
            {"id": "phys_alg", "name": "Algebra-Based"},
            {"id": "phys_calc", "name": "Calculus-Based"},
        ],
    },
    "chem": {
        "title": "Chemistry",
        "topics": [
            {"id": "chem1", "name": "Chemistry I"},
            {"id": "chem2", "name": "Chemistry II"},
        ],
    },
}

QUESTION_BANK = {
    "trig": [
        {"rating":500,"q":"sin(0) = ?","a":["0","1","−1","√2/2"],"correct":0},
        {"rating":520,"q":"cos(0) = ?","a":["0","1","−1","√3/2"],"correct":1},
        {"rating":560,"q":"sin(90°) = ?","a":["0","1","√3/2","−1"],"correct":1},
        {"rating":600,"q":"tan(45°) = ?","a":["1","0","√3","1/√3"],"correct":0},
    ],
    "calc1": [
        {"rating":560,"q":"d/dx(x²) = ?","a":["x","2x","x²","2"],"correct":1},
        {"rating":590,"q":"∫ x dx = ?","a":["x","x²/2","2x","ln x"],"correct":1},
        {"rating":620,"q":"lim (x→1) (x²−1)/(x−1) = ?","a":["0","1","2","undefined"],"correct":2},
    ],
    "code_puzzles": [
        {"rating":600,"q":"Time complexity of binary search?","a":["O(n)","O(log n)","O(n²)","O(1)"],"correct":1},
        {"rating":630,"q":"A stack is…","a":["FIFO","LIFO","Tree","Graph"],"correct":1},
    ],
    "chem1": [
        {"rating":550,"q":"Water formula?","a":["H2O","CO2","O2","H2"],"correct":0},
        {"rating":610,"q":"Avogadro's number is…","a":["6.02×10²³","3.14","9.81","1.6×10⁻¹⁹"],"correct":0},
    ],
}

def expected(player, opp):
    return 1 / (1 + 10 ** ((opp - player) / 400))

def update_elo(player, q_rating, correct, K=24, min_rating=100):
    E = expected(player, q_rating)
    S = 1 if correct else 0
    return max(min_rating, round(player + K * (S - E)))

def pick_question(bank, player_elo, target=100, step=50, maxw=300):
    avail = [q for q in bank if not q.get("_used")]
    if not avail: 
        return None
    window = target
    while window <= maxw:
        candidates = [q for q in avail if abs(q["rating"] - player_elo) <= window]
        if candidates:
            q = random.choice(candidates); q["_used"] = True; return q
        window += step
    q = random.choice(avail); q["_used"] = True; return q

def choose(prompt, options):
    print(prompt)
    for i, (key, label) in enumerate(options, 1):
        print(f"  {i}. {label}")
    while True:
        ans = input("Select: ").strip()
        if ans.isdigit():
            idx = int(ans) - 1
            if 0 <= idx < len(options):
                return options[idx][0]
        print("Invalid. Try again.")

def main():
    print("=== Adaptive Elo Quiz (CLI) ===")
    topic_elos = {}

    subjects = [(key, SUBJECTS[key]["title"]) for key in SUBJECTS]
    subj_key = choose("Choose a subject:", subjects)
    topics = [(t["id"], t["name"]) for t in SUBJECTS[subj_key]["topics"]]
    topic_id = choose("Choose a topic:", topics)

    bank = QUESTION_BANK.get(topic_id, [])
    if not bank:
        print("No questions for this topic. Exiting.")
        return

    for q in bank: q["_used"] = False

    start = topic_elos.get(topic_id, 600)
    cur = start
    print(f"\nStarting ELO for {topic_id}: {start}")
    n_questions = 5
    for i in range(1, n_questions+1):
        q = pick_question(bank, cur)
        if not q:
            print("Out of questions."); break
        print(f\"\"\"\nQ{i} [{q['rating']}]: {q['q']}\"\"\")
        for j, opt in enumerate(q["a"], 1):
            print(f"  {j}. {opt}")
        ans = input("Your choice (1-4): ").strip()
        try:
            idx = int(ans) - 1
        except:
            idx = -1
        correct = (idx == q["correct"])
        cur_new = update_elo(cur, q["rating"], correct)
        delta = cur_new - cur
        cur = cur_new
        print("✅ Correct!" if correct else "❌ Wrong.", f"ELO {'+' if delta>=0 else ''}{delta} → {cur}")

    topic_elos[topic_id] = cur
    print(f"\nMatch complete. Start: {start}, End: {cur}, Δ: {cur-start:+}")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nBye!")
