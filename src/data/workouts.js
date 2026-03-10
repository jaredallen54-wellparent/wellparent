// ─── Reset Workouts (5 min each) ──────────────────────────────────────────────
export const resetWorkouts = [
  {
    id: "reset-001",
    name: "The Reset",
    duration: 5,
    tag: "Any moment",
    isReset: true,
    equipment: [],
    persona_tags: ["mom", "dad", "caregiver"],
    postpartum_safe: true,
    exercises: [
      { id: "r1", name: "Deep Breath", duration: 30, description: "Inhale 4 counts, exhale 6. Let your shoulders drop." },
      { id: "r2", name: "Neck Rolls", duration: 30, description: "Slow circles, both directions. No rushing." },
      { id: "r3", name: "Shoulder Shrugs", duration: 30, description: "Up to your ears, hold 2 seconds, release." },
      { id: "r4", name: "Chest Opener", duration: 30, description: "Arms wide, breathe into the front of your chest." },
    ]
  },
  {
    id: "reset-002",
    name: "The Morning Reset",
    duration: 5,
    tag: "Before the day begins",
    isReset: true,
    equipment: [],
    persona_tags: ["mom", "dad", "caregiver"],
    postpartum_safe: true,
    exercises: [
      { id: "r1", name: "Cat-Cow", duration: 30, description: "Wake up the spine. One breath per movement." },
      { id: "r2", name: "Hip Circles", duration: 30, description: "Wide stance, slow circles. Feel the release." },
      { id: "r3", name: "Standing Forward Fold", duration: 30, description: "Soft knees. Let gravity do the work." },
      { id: "r4", name: "Final Breath", duration: 30, description: "One long inhale. One long exhale. Done." },
    ]
  },
  {
    id: "reset-003",
    name: "The Invisible Caregiver Reset",
    duration: 5,
    tag: "You carry a lot. Set it down.",
    isReset: true,
    equipment: [],
    persona_tags: ["caregiver"],
    postpartum_safe: true,
    exercises: [
      { id: "r1", name: "Seated Breath", duration: 30, description: "Both hands on knees. Breathe slowly. You're allowed to stop." },
      { id: "r2", name: "Wrist Circles", duration: 30, description: "Both directions. You carry a lot in these." },
      { id: "r3", name: "Shoulder Roll", duration: 30, description: "Back and down. Repeat until they finally drop." },
      { id: "r4", name: "Neck Side Stretch", duration: 30, description: "Ear to shoulder. Hold 10 counts. Switch sides." },
    ]
  },
  {
    id: "reset-004",
    name: "Nap Time Reset",
    duration: 5,
    tag: "While the baby sleeps",
    isReset: true,
    equipment: [],
    persona_tags: ["mom", "dad"],
    postpartum_safe: true,
    exercises: [
      { id: "r1", name: "Diaphragmatic Breath", duration: 30, description: "Hand on belly. Breathe into your hand. Exhale fully.", postpartum_caution: false },
      { id: "r2", name: "Glute Bridge", duration: 30, description: "Press through heels. Small movement. Big release.", postpartum_caution: false },
      { id: "r3", name: "Child's Pose", duration: 30, description: "Arms forward or alongside. Let everything go.", postpartum_caution: false },
      { id: "r4", name: "Seated Twist", duration: 30, description: "Gentle rotation. One hand behind, one on knee. Both sides.", postpartum_caution: true },
    ]
  },
];

// ─── Regular Workouts ──────────────────────────────────────────────────────────
export const workouts = [
  {
    id: "w-001",
    name: "Nap Window",
    duration: 15,
    tag: "While baby sleeps",
    level: "Beginner",
    equipment: [],
    persona_tags: ["mom", "dad"],
    postpartum_safe: false,
    focus: "Strength",
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
    equipment: [],
    persona_tags: ["mom", "dad", "caregiver"],
    postpartum_safe: false,
    focus: "Strength",
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
    equipment: [],
    persona_tags: ["mom", "dad", "caregiver"],
    postpartum_safe: false,
    focus: "Energy",
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
    equipment: ["dumbbells"],
    persona_tags: ["mom", "dad", "caregiver"],
    postpartum_safe: false,
    focus: "Strength",
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
    level: "Beginner",
    equipment: [],
    persona_tags: ["mom"],
    postpartum_safe: true,
    focus: "Strength",
    exercises: [
      { id: "e1", name: "Diaphragmatic Breathing", duration: 60, description: "Breathe into your ribcage. Exhale fully.", postpartum_caution: false },
      { id: "e2", name: "Heel Slides", sets: 2, reps: 10, description: "Lie on back. Slide one heel out, return. No breath holding.", postpartum_caution: false },
      { id: "e3", name: "Clamshells", sets: 2, reps: 15, description: "Side-lying. Keep hips stacked. Glutes only.", postpartum_caution: false },
      { id: "e4", name: "Wall Sit", duration: 30, description: "Back flat against wall. Breathe normally.", postpartum_caution: false },
      { id: "e5", name: "Standing Hip Hinge", sets: 2, reps: 10, description: "Hands on hips. Hinge forward, return tall.", postpartum_caution: false }
    ]
  },
  {
    id: "w-006",
    name: "Baby Nap Window",
    duration: 10,
    tag: "10 minutes. No explanation needed.",
    level: "Beginner",
    equipment: [],
    persona_tags: ["mom", "dad"],
    postpartum_safe: true,
    focus: "Strength",
    exercises: [
      { id: "e1", name: "Glute Bridges", sets: 3, reps: 12, description: "Feet flat, knees bent. Press up and hold 2 seconds.", postpartum_caution: false },
      { id: "e2", name: "Bird Dog", sets: 2, reps: 8, description: "Opposite arm and leg. Slow. Core stays quiet.", postpartum_caution: false },
      { id: "e3", name: "Wall Push-Ups", sets: 2, reps: 12, description: "Hands on wall at chest height. Controlled movement.", postpartum_caution: false },
      { id: "e4", name: "Standing Side Stretch", duration: 30, description: "Both sides. Breathe into the stretch.", postpartum_caution: false }
    ]
  },
  {
    id: "w-007",
    name: "School Drop-off Burn",
    duration: 10,
    tag: "Between drop-off and everything else",
    level: "Moderate",
    equipment: [],
    persona_tags: ["dad", "caregiver"],
    postpartum_safe: false,
    focus: "Energy",
    exercises: [
      { id: "e1", name: "Jumping Jacks", duration: 30, description: "Get the heart rate up. Quick." },
      { id: "e2", name: "Bodyweight Squats", sets: 2, reps: 15, description: "Fast pace. Stay light on your feet." },
      { id: "e3", name: "Mountain Climbers", duration: 30, description: "Slow and controlled, not frantic." },
      { id: "e4", name: "Push-Ups", sets: 2, reps: 10, description: "Good form over speed." },
      { id: "e5", name: "Standing Forward Fold", duration: 30, description: "Breathe. Back down before the school run." }
    ]
  },
  {
    id: "w-008",
    name: "Rebuilder — Week 1",
    duration: 20,
    tag: "Your body is doing something remarkable.",
    level: "Beginner",
    equipment: [],
    persona_tags: ["mom"],
    postpartum_safe: true,
    focus: "Strength",
    exercises: [
      { id: "e1", name: "Pelvic Floor Activation", duration: 60, description: "Gentle contraction and release. No rush. No strain.", postpartum_caution: false },
      { id: "e2", name: "Heel Slides", sets: 3, reps: 10, description: "Slow, deliberate. One leg at a time. Breathe out as you extend.", postpartum_caution: false },
      { id: "e3", name: "Glute Bridge", sets: 3, reps: 10, description: "Slow up, hold 2 seconds, slow down. Core gently engaged.", postpartum_caution: false },
      { id: "e4", name: "Clamshells", sets: 2, reps: 15, description: "Keep your hips stacked. Small movement, big work.", postpartum_caution: false },
      { id: "e5", name: "Cat-Cow", sets: 1, reps: 10, description: "Restore movement to the spine. Gentle.", postpartum_caution: false },
      { id: "e6", name: "Supported Squat", duration: 40, description: "Hold a doorframe or chair. Sink low, breathe, rise slowly.", postpartum_caution: true }
    ]
  },
  {
    id: "w-009",
    name: "Low Energy Mobility Flow",
    duration: 20,
    tag: "On the days you're running on empty",
    level: "Beginner",
    equipment: [],
    persona_tags: ["mom", "dad", "caregiver"],
    postpartum_safe: true,
    focus: "Mobility",
    energy_tag: "low",
    exercises: [
      { id: "e1", name: "Child's Pose", duration: 60, description: "Arms forward. Let your back round. Breathe." },
      { id: "e2", name: "Hip Circles", duration: 45, description: "Lie on back, knees to chest. Slow circles." },
      { id: "e3", name: "Supine Twist", duration: 60, description: "Knees to one side. Shoulders on the floor. Both sides.", postpartum_caution: true },
      { id: "e4", name: "Seated Forward Fold", duration: 45, description: "Legs straight or bent. Reach forward. Let go." },
      { id: "e5", name: "Pigeon Pose", duration: 60, description: "One side at a time. Hold and breathe. 5 slow breaths." },
      { id: "e6", name: "Legs Up the Wall", duration: 90, description: "The most restorative thing you can do today. Just stay here." }
    ]
  },
  {
    id: "w-010",
    name: "Core Re-entry",
    duration: 20,
    tag: "Deep core. Done safely.",
    level: "Beginner",
    equipment: [],
    persona_tags: ["mom"],
    postpartum_safe: true,
    focus: "Strength",
    exercises: [
      { id: "e1", name: "360-Degree Breathing", duration: 60, description: "Breathe into all sides of your ribcage. Exhale completely.", postpartum_caution: false },
      { id: "e2", name: "TVA Activation", sets: 3, reps: 10, description: "Draw navel gently toward spine. Hold 5 seconds. No bracing.", postpartum_caution: false },
      { id: "e3", name: "Dead Bug", sets: 3, reps: 6, description: "Opposite arm and leg. Lower back stays flat. Exhale as you extend.", postpartum_caution: false },
      { id: "e4", name: "Bird Dog", sets: 3, reps: 8, description: "On all fours. Slow. Hips stay level.", postpartum_caution: false },
      { id: "e5", name: "Side-Lying Leg Lift", sets: 2, reps: 12, description: "Straight leg lifts. Hip stays stacked. Both sides.", postpartum_caution: false }
    ]
  },
  {
    id: "w-011",
    name: "Lunch Break Strength",
    duration: 30,
    tag: "A proper one, when you get the chance",
    level: "Moderate",
    equipment: ["dumbbells"],
    persona_tags: ["mom", "dad", "caregiver"],
    postpartum_safe: false,
    focus: "Strength",
    exercises: [
      { id: "e1", name: "Goblet Squat", sets: 4, reps: 12, description: "Dumbbell at chest. Sit back and deep." },
      { id: "e2", name: "Romanian Deadlift", sets: 3, reps: 10, description: "Slow eccentric. Feel the hamstrings load." },
      { id: "e3", name: "Dumbbell Row", sets: 3, reps: 10, description: "Each side. Elbow to ceiling. Full range." },
      { id: "e4", name: "Shoulder Press", sets: 3, reps: 10, description: "Seated or standing. Press overhead. Ribs down." },
      { id: "e5", name: "Farmer's Carry", duration: 45, description: "Heavy as you can manage. Walk tall." },
      { id: "e6", name: "Plank Hold", duration: 40, description: "Forearms or hands. Breathe. Don't hold it." }
    ]
  },
  {
    id: "w-012",
    name: "Evening Wind-Down",
    duration: 20,
    tag: "After they're all in bed",
    level: "Beginner",
    equipment: [],
    persona_tags: ["mom", "dad", "caregiver"],
    postpartum_safe: true,
    focus: "Mobility",
    energy_tag: "low",
    exercises: [
      { id: "e1", name: "Neck Side Stretch", duration: 40, description: "Ear to shoulder. Breathe. Both sides." },
      { id: "e2", name: "Seated Chest Stretch", duration: 40, description: "Fingers interlaced behind back. Open the chest." },
      { id: "e3", name: "Figure-4 Hip Opener", duration: 60, description: "Ankle on knee. Flex the foot. Lean forward gently." },
      { id: "e4", name: "Child's Pose", duration: 60, description: "Stay as long as you need." },
      { id: "e5", name: "Supine Twist", duration: 60, description: "Both sides. Let your shoulders stay heavy.", postpartum_caution: true },
      { id: "e6", name: "Savasana", duration: 60, description: "Lie flat. Close your eyes. This counts." }
    ]
  },
];

// For backward compat — first Reset used by ResetPlayer
export const theReset = resetWorkouts[0];

// All workouts combined (used by player to resolve any workout ID)
export const allWorkouts = [...resetWorkouts, ...workouts];
