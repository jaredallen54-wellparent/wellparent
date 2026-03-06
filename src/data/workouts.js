export const theReset = {
  id: "reset-001",
  name: "The Reset",
  duration: 5,
  tag: "Any moment",
  isReset: true,
  exercises: [
    { id: "r1", name: "Deep Breath", duration: 30, description: "Inhale 4 counts, exhale 6. Let your shoulders drop." },
    { id: "r2", name: "Neck Rolls", duration: 30, description: "Slow circles, both directions. No rushing." },
    { id: "r3", name: "Shoulder Shrugs", duration: 30, description: "Up to your ears, hold 2 seconds, release." },
    { id: "r4", name: "Wrist Circles", duration: 20, description: "Both directions. You carry a lot." },
    { id: "r5", name: "Chest Opener", duration: 30, description: "Arms wide, breathe into the front of your chest." },
    { id: "r6", name: "Hip Circles", duration: 30, description: "Wide stance, slow circles. Feel the release." },
    { id: "r7", name: "Standing Forward Fold", duration: 30, description: "Soft knees. Let gravity do the work." },
    { id: "r8", name: "Final Breath", duration: 30, description: "One long inhale. One long exhale. Done." }
  ]
};

export const workouts = [
  {
    id: "w-001",
    name: "Nap Window",
    duration: 15,
    tag: "While baby sleeps",
    level: "Beginner",
    equipment: "None",
    exercises: [
      { id: "e1", name: "Bodyweight Squats", sets: 3, reps: 10, description: "Feet shoulder-width. Sit back into it." },
      { id: "e2", name: "Push-Ups", sets: 3, reps: 8, description: "Knees down is fine. Full chest to floor." },
      { id: "e3", name: "Glute Bridges", sets: 3, reps: 12, description: "Press through your heels. Squeeze at the top." },
      { id: "e4", name: "Dead Bug", sets: 2, reps: 8, description: "Slow and controlled. Lower back stays flat." },
      { id: "e5", name: "Child's Pose", duration: 30, description: "You earned this. Breathe." }
    ]
  },
  {
    id: "w-002",
    name: "After Bedtime",
    duration: 20,
    tag: "When the house is quiet",
    level: "Moderate",
    equipment: "None",
    exercises: [
      { id: "e1", name: "Reverse Lunges", sets: 3, reps: 10, description: "Step back, not forward. Easier on the knees." },
      { id: "e2", name: "Incline Push-Ups", sets: 3, reps: 12, description: "Hands on couch or counter. Full range." },
      { id: "e3", name: "Single-Leg Deadlift", sets: 2, reps: 8, description: "Hinge at the hip. Slight bend in the standing leg." },
      { id: "e4", name: "Plank Hold", duration: 30, description: "Breathe. You're stronger than you think." },
      { id: "e5", name: "Hip Flexor Stretch", duration: 40, description: "Low lunge. Sink into it. Both sides." }
    ]
  },
  {
    id: "w-003",
    name: "Morning 10",
    duration: 10,
    tag: "Before the chaos starts",
    level: "Beginner",
    equipment: "None",
    exercises: [
      { id: "e1", name: "Cat-Cow", sets: 1, reps: 10, description: "Wake up the spine. Slow and intentional." },
      { id: "e2", name: "World's Greatest Stretch", sets: 1, reps: 5, description: "Each side. Open up the whole chain." },
      { id: "e3", name: "Bodyweight Squats", sets: 2, reps: 12, description: "Get the blood moving." },
      { id: "e4", name: "Push-Ups", sets: 2, reps: 10, description: "Start the day strong." }
    ]
  },
  {
    id: "w-004",
    name: "Carry Heavy Things",
    duration: 25,
    tag: "You do this every day anyway",
    level: "Moderate",
    equipment: "Optional dumbbells",
    exercises: [
      { id: "e1", name: "Goblet Squats", sets: 3, reps: 12, description: "Hold weight at chest. Baby counts as a weight." },
      { id: "e2", name: "Romanian Deadlift", sets: 3, reps: 10, description: "Hinge deep. Feel the hamstrings load." },
      { id: "e3", name: "Bent-Over Row", sets: 3, reps: 10, description: "Pull elbows back. Squeeze shoulder blades." },
      { id: "e4", name: "Farmer's Carry", duration: 40, description: "Walk the room. Back tall, shoulders packed." },
      { id: "e5", name: "Hip Stretch Flow", duration: 45, description: "Pigeon or figure-4. Both sides." }
    ]
  },
  {
    id: "w-005",
    name: "Postpartum Strong",
    duration: 15,
    tag: "Gentle. Intentional. Yours.",
    level: "Postpartum-safe",
    equipment: "None",
    postpartumSafe: true,
    exercises: [
      { id: "e1", name: "Diaphragmatic Breathing", duration: 60, description: "Breathe into your ribcage. Exhale fully." },
      { id: "e2", name: "Heel Slides", sets: 2, reps: 10, description: "Lie on back. Slide one heel out, return. No breath holding." },
      { id: "e3", name: "Clamshells", sets: 2, reps: 15, description: "Side-lying. Keep hips stacked. Glutes only." },
      { id: "e4", name: "Wall Sit", duration: 30, description: "Back flat against wall. Breathe normally." },
      { id: "e5", name: "Standing Hip Hinge", sets: 2, reps: 10, description: "Hands on hips. Hinge forward, return tall." }
    ]
  }
];
