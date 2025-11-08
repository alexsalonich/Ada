import random
import json
import os
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.popup import Popup
from kivy.uix.button import Button

# -----------------------------
# Leaderboard Class
# -----------------------------
class Leaderboard:
    def __init__(self, filename="leaderboard.json", max_entries=5):
        self.filename = filename
        self.max_entries = max_entries
        self.scores = self.load_scores()

    def load_scores(self):
        if os.path.exists(self.filename):
            with open(self.filename, "r") as f:
                return json.load(f)
        return []



# Separate Code to sync each game?

def end_game(self):
        # Disable input
        self.input_box.disabled = True

        # Popup to enter name
        content = BoxLayout(orientation="vertical", spacing=10)
        name_input = TextInput(hint_text="Enter your name", multiline=False, font_size=24)
        submit_btn = Button(text="Submit", size_hint_y=None, height=50)

        content.add_widget(name_input)
        content.add_widget(submit_btn)

        popup = Popup(title=f"Game Over! Score: {self.score}", content=content,
                      size_hint=(0.8, 0.5), auto_dismiss=False)

        def submit_name(instance):
            player_name = name_input.text.strip()
            if player_name:
                lb = Leaderboard()
                lb.add_score(player_name, self.score)
                scores_text = "\n".join([f"{i+1}. {s['name']} - {s['score']}" for i, s in enumerate(lb.get_top_scores())])
                self.definition_label.text = f"Leaderboard:\n{scores_text}"
                popup.dismiss()

        submit_btn.bind(on_press=submit_name)
        popup.open()
        return self.scores
