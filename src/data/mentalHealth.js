export const breathingExercises = [
  {
    id: "b-001",
    name: "4-7-8 Calm",
    duration: 5,
    description: "A nervous system reset in under 5 minutes. Inhale for 4, hold for 7, exhale for 8.",
    rounds: 4,
    offlineAvailable: true,
    phases: [
      { label: "Inhale", duration: 4 },
      { label: "Hold", duration: 7 },
      { label: "Exhale", duration: 8 },
    ]
  },
  {
    id: "b-002",
    name: "Box Breathing Reset",
    duration: 4,
    description: "Equal counts in, hold, out, hold. Used by everyone from athletes to first responders.",
    rounds: 5,
    offlineAvailable: true,
    phases: [
      { label: "Inhale", duration: 4 },
      { label: "Hold", duration: 4 },
      { label: "Exhale", duration: 4 },
      { label: "Hold", duration: 4 },
    ]
  },
  {
    id: "b-003",
    name: "Parent Brain Breathe",
    duration: 3,
    description: "Quick reset for when you've been touched, talked at, and pulled in 12 directions.",
    rounds: 5,
    offlineAvailable: true,
    phases: [
      { label: "Inhale", duration: 4 },
      { label: "Exhale", duration: 6 },
    ]
  },
];

export const sleepMeditations = [
  {
    id: "s-001",
    name: "Sleep Drop",
    duration: 10,
    description: "A guided body scan to help you stop thinking about tomorrow's list and actually fall asleep.",
    offlineAvailable: true,
    comingSoon: false,
  },
  {
    id: "s-002",
    name: "Body Scan for Tired Parents",
    duration: 8,
    description: "From head to toe, let every part of you rest. You've earned this.",
    offlineAvailable: true,
    comingSoon: false,
  },
];

export const journalPrompts = [
  "What felt hard today, and what did you handle anyway?",
  "What's one small thing that went right — even if everything else didn't?",
  "What does your body need from you right now that you haven't given it?",
  "What would you say to a friend going through exactly your week?",
  "What are you proud of that no one else would think to mention?",
  "What would 'good enough' look like today, and did you reach it?",
  "Who helped you this week, even in a small way? Have you told them?",
];

export const circles = [
  {
    id: 'c-new-parents',
    name: 'New Parents',
    emoji: '🌱',
    members: 1247,
    tagline: 'First year together.',
    category: 'Life Stage',
    posts: [
      { id: 'p-001', author: 'Maya R.', time: '2h ago', content: 'Did the 10-min Baby Nap Window three times this week while Theo slept. First time I\'ve felt like myself in months.', reactions: 14 },
      { id: 'p-002', author: 'Daniel K.', time: 'Yesterday', content: 'Paused my workout 3 times because Liam woke up. Resumed each time. App said "You paused and came back. That counts." It does.', reactions: 22 },
      { id: 'p-003', author: 'Rachel H.', time: '2 days ago', content: 'Nobody told me the fourth trimester would hit this hard. Glad I found this place.', reactions: 38 },
    ],
  },
  {
    id: 'c-postpartum',
    name: 'Postpartum Recovery',
    emoji: '🌿',
    members: 892,
    tagline: 'Healing at your pace.',
    category: 'Recovery',
    posts: [
      { id: 'p-004', author: 'Sarah M.', time: '5h ago', content: 'Week 8 postpartum. Just did Core Re-entry for the first time. Cried a little at the end. Not in a bad way.', reactions: 31 },
      { id: 'p-005', author: 'Aisha T.', time: '2 days ago', content: 'My OB said I could start light movement. Started with Rebuilder Week 1. The cue "your body is doing something remarkable" made me cry. Thank you.', reactions: 58 },
      { id: 'p-006', author: 'Jen B.', time: '3 days ago', content: 'Six months pp and finally feel ready. Slow and steady.', reactions: 19 },
    ],
  },
  {
    id: 'c-baby-nap-prs',
    name: 'Baby Nap PRs',
    emoji: '💪',
    members: 2103,
    tagline: 'When 10 minutes is everything.',
    category: 'Movement',
    posts: [
      { id: 'p-007', author: 'Chris L.', time: '1h ago', content: '11 minutes today. New personal record. Nap windows are real workouts.', reactions: 27 },
      { id: 'p-008', author: 'Tamara W.', time: '3h ago', content: 'Three nap-window workouts this week. I feel like an athlete.', reactions: 16 },
      { id: 'p-009', author: 'James O.', time: 'Yesterday', content: 'Completed The Reset during a 7-minute power nap window. Barely. Worth it.', reactions: 42 },
    ],
  },
  {
    id: 'c-solo-parents',
    name: 'Solo Parents',
    emoji: '⭐',
    members: 634,
    tagline: 'You\'re not doing this alone.',
    category: 'Support',
    posts: [
      { id: 'p-010', author: 'Marcus T.', time: '6h ago', content: 'Single dad, 18-month-old. Doing the 5-minute reset while she watches Bluey. Progress.', reactions: 33 },
      { id: 'p-011', author: 'Kezia A.', time: 'Yesterday', content: 'No family nearby. This community is it. Thank you all.', reactions: 51 },
    ],
  },
  {
    id: 'c-caregivers',
    name: 'Caregiver Corner',
    emoji: '💛',
    members: 418,
    tagline: 'Because you matter too.',
    category: 'Support',
    posts: [
      { id: 'p-012', author: 'Patricia H.', time: 'Yesterday', content: 'I\'m 67 and I\'m a primary caregiver for my grandson. The Invisible Caregiver Reset is the first workout I\'ve done in 10 years. I did all 5 minutes.', reactions: 47 },
      { id: 'p-013', author: 'David R.', time: '2 days ago', content: 'Caring for a parent with dementia while raising two kids. This app is the only thing that\'s mine.', reactions: 62 },
    ],
  },
];

export const communityThreads = [
  {
    id: "t-001",
    category: "Baby Nap PRs",
    author: "Maya R.",
    time: "2h ago",
    content: "Did the 10-min Baby Nap Window three times this week while Theo slept. First time I've felt like myself in months.",
    reactions: 14,
  },
  {
    id: "t-002",
    category: "Postpartum Progress",
    author: "Sarah M.",
    time: "5h ago",
    content: "Week 8 postpartum. Just did Core Re-entry for the first time. Cried a little at the end. Not in a bad way.",
    reactions: 31,
  },
  {
    id: "t-003",
    category: "Caregiver Corner",
    author: "Patricia H.",
    time: "Yesterday",
    content: "I'm 67 and I'm a primary caregiver for my grandson. The Invisible Caregiver Reset is the first workout I've done in 10 years. I did all 5 minutes.",
    reactions: 47,
  },
  {
    id: "t-004",
    category: "Baby Nap PRs",
    author: "Daniel K.",
    time: "Yesterday",
    content: "Paused my workout 3 times because Liam woke up. Resumed each time. App said 'You paused and came back. That counts.' It does.",
    reactions: 22,
  },
  {
    id: "t-005",
    category: "Postpartum Progress",
    author: "Aisha T.",
    time: "2 days ago",
    content: "My OB said I could start light movement. Started with Rebuilder Week 1. The cue 'your body is doing something remarkable' made me cry. Thank you.",
    reactions: 58,
  },
];
