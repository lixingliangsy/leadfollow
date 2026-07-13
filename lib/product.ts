export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "LeadFollow",
  slug: "leadfollow",
  tagline: "Post-showing and nurture emails that keep you top of mind.",
  description: "Generate a warm follow-up after a showing, an open-house thank-you, or a long-term nurture note - matched to your stage and tone.",
  toolTitle: "Write a follow-up email",
  resultLabel: "Your follow-up email",
  ctaLabel: "Write email",
  features: [
  "Stage-aware copy",
  "Warm or pro tone",
  "Clear next step",
  "No-pressure close"
],
  inputs: [
  {
    "key": "stage",
    "label": "Stage",
    "type": "select",
    "options": [
      "After showing",
      "Post open house",
      "Long-term nurture"
    ]
  },
  {
    "key": "name",
    "label": "Contact first name",
    "type": "input",
    "placeholder": "e.g. Jordan"
  },
  {
    "key": "property",
    "label": "Property (optional)",
    "type": "input",
    "placeholder": "e.g. 12 Oak St"
  },
  {
    "key": "tone",
    "label": "Tone",
    "type": "select",
    "options": [
      "Warm",
      "Professional",
      "Brief"
    ]
  }
] as InputField[],
  systemPrompt: "You are a real estate agent's assistant. Given a follow-up stage, a contact first name, an optional property, and a tone, write a short follow-up email: a personal opener, one relevant next step (tour, second look, call), and a no-pressure close. For long-term nurture, lead with market value, not a pitch. In demo mode, return a realistic sample following this structure.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "5 emails/mo"
  },
  {
    "tier": "Pro",
    "price": "$19/mo",
    "desc": "Unlimited, save history"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const st = inputs['stage'] || 'After showing'
  const nm = (inputs['name'] || 'there').trim()
  const pr = (inputs['property'] || '').trim()
  const t = inputs['tone'] || 'Warm'
  let out = 'FOLLOW-UP EMAIL (' + st + ' | ' + t + ')\n\n'
  out += 'Subject: Great seeing you' + (pr ? ' at ' + pr : '') + '\n\n'
  out += 'Hi ' + nm + ',\n\n'
  out += 'Thanks for stopping by' + (pr ? ' ' + pr : ' today') + '. It was good to hear what you\'re looking for.\n\n'
  if (st === 'Long-term nurture') {
    out += 'Quick note: ' + (pr || 'your area') + ' has seen steady interest this season - happy to share a no-strings market snapshot whenever you want.\n\n'
  } else {
    out += 'Want to take another look, or hop on a 10-min call this week to compare notes?\n\n'
  }
  out += 'Either way, no rush - just here when you\'re ready.\n\n'
  out += 'Best,\n[Your name]\n\n'
  out += '\n--- (Mock demo. Add the name + stage for a tailored email.)'
  return out
}
}
