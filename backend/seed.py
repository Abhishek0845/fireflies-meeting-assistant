"""
Seed script — populates the database with 5 realistic meetings.

Run with:  python seed.py   (from the backend/ directory)

The script is idempotent: it wipes existing meeting + user data on every run
so you can safely re-run it to reset to a clean known state.
"""

from database import SessionLocal, engine, Base
import models
from datetime import datetime

Base.metadata.create_all(bind=engine)


def seed():
    db = SessionLocal()

    # ── Wipe existing data (order matters due to FK constraints) ──────────────
    db.query(models.MeetingTopic).delete()
    db.query(models.ActionItem).delete()
    db.query(models.TranscriptSegment).delete()
    db.query(models.Participant).delete()
    db.query(models.Meeting).delete()
    db.query(models.Topic).delete()
    db.query(models.User).delete()
    db.commit()

    # ── Default User ──────────────────────────────────────────────────────────
    user = models.User(name="Abhishek Singh", email="abhirathore845@gmail.com")
    db.add(user)
    db.commit()
    db.refresh(user)

    # ── Topics ────────────────────────────────────────────────────────────────
    topics = {
        name: models.Topic(name=name)
        for name in ["Engineering", "Product", "Design", "Marketing", "Strategy", "Customers", "Investors"]
    }
    db.add_all(topics.values())
    db.commit()

    # ─────────────────────────────────────────────────────────────────────────
    # MEETING 1 — Q4 Product Strategy Sync
    # ─────────────────────────────────────────────────────────────────────────
    m1 = models.Meeting(
        user_id=user.id,
        title="Q4 Product Strategy Sync",
        meeting_date=datetime(2023, 10, 15, 10, 0, 0),
        duration_seconds=1850,
        summary=(
            "Discussed the Q4 roadmap, focusing on the interactive transcript feature "
            "and mobile app launch. Marketing alignment achieved. Budget approved for "
            "the new data pipeline. Mobile launch set for mid-November."
        ),
        status="completed",
    )
    db.add(m1)
    db.flush()

    db.add_all([
        models.Participant(meeting_id=m1.id, name="Abhishek"),
        models.Participant(meeting_id=m1.id, name="Sarah"),
        models.Participant(meeting_id=m1.id, name="Mike"),
        models.Participant(meeting_id=m1.id, name="Lisa"),
    ])

    db.add_all([
        models.TranscriptSegment(meeting_id=m1.id, speaker_name="Abhishek", start_time=0.5,  end_time=5.0,  text="Hey everyone, thanks for jumping on. Let's walk through our Q4 priorities today."),
        models.TranscriptSegment(meeting_id=m1.id, speaker_name="Sarah",    start_time=5.3,  end_time=10.1, text="I've sent over the updated marketing roadmap. Main push is the mobile app launch campaign."),
        models.TranscriptSegment(meeting_id=m1.id, speaker_name="Mike",     start_time=10.4, end_time=16.2, text="From engineering, the interactive transcript feature is 80% done. We're on track for October 28th."),
        models.TranscriptSegment(meeting_id=m1.id, speaker_name="Lisa",     start_time=16.5, end_time=22.0, text="Design-wise, we've finalized the mobile UI. Handoff to engineering happens tomorrow."),
        models.TranscriptSegment(meeting_id=m1.id, speaker_name="Abhishek", start_time=22.3, end_time=28.0, text="Great progress. Mike, can you own the mobile integration? Sarah, handle the press release coordination?"),
        models.TranscriptSegment(meeting_id=m1.id, speaker_name="Sarah",    start_time=28.2, end_time=30.5, text="Absolutely. I'll have a draft ready by end of week."),
        models.TranscriptSegment(meeting_id=m1.id, speaker_name="Mike",     start_time=30.8, end_time=35.0, text="Will do. I'll also schedule a quick sync with the iOS and Android teams tomorrow morning."),
        models.TranscriptSegment(meeting_id=m1.id, speaker_name="Abhishek", start_time=35.2, end_time=38.0, text="Perfect. Let's reconvene next week to check progress. Thanks all."),
    ])

    db.add_all([
        models.ActionItem(meeting_id=m1.id, description="Send Q4 marketing roadmap to the full team", is_completed=True,  assignee="Sarah"),
        models.ActionItem(meeting_id=m1.id, description="Schedule mobile app launch kickoff with iOS and Android teams", is_completed=False, assignee="Mike"),
        models.ActionItem(meeting_id=m1.id, description="Complete handoff of mobile UI design assets to engineering", is_completed=True,  assignee="Lisa"),
        models.ActionItem(meeting_id=m1.id, description="Draft press release for mobile app launch", is_completed=False, assignee="Sarah"),
    ])

    db.add_all([
        models.MeetingTopic(meeting_id=m1.id, topic_id=topics["Product"].id),
        models.MeetingTopic(meeting_id=m1.id, topic_id=topics["Strategy"].id),
        models.MeetingTopic(meeting_id=m1.id, topic_id=topics["Marketing"].id),
    ])

    # ─────────────────────────────────────────────────────────────────────────
    # MEETING 2 — Weekly Engineering Standup
    # ─────────────────────────────────────────────────────────────────────────
    m2 = models.Meeting(
        user_id=user.id,
        title="Weekly Engineering Standup",
        meeting_date=datetime(2023, 10, 22, 9, 0, 0),
        duration_seconds=620,
        summary=(
            "Quick sync on engineering blockers. Database migration to PostgreSQL "
            "discussed and approved for next sprint. PR #142 merged successfully. "
            "No critical blockers reported."
        ),
        status="completed",
    )
    db.add(m2)
    db.flush()

    db.add_all([
        models.Participant(meeting_id=m2.id, name="Abhishek"),
        models.Participant(meeting_id=m2.id, name="David"),
    ])

    db.add_all([
        models.TranscriptSegment(meeting_id=m2.id, speaker_name="David",    start_time=0.0,  end_time=3.5,  text="Morning Abhishek. No blockers on the frontend. PR #142 is ready for final review."),
        models.TranscriptSegment(meeting_id=m2.id, speaker_name="Abhishek", start_time=3.8,  end_time=8.2,  text="Morning. I'll review it before noon. I'm wrapping up the FastAPI PATCH endpoints today."),
        models.TranscriptSegment(meeting_id=m2.id, speaker_name="David",    start_time=8.5,  end_time=13.0, text="Are we still planning to migrate to PostgreSQL this sprint? I want to plan the ORM changes."),
        models.TranscriptSegment(meeting_id=m2.id, speaker_name="Abhishek", start_time=13.2, end_time=17.5, text="Yes, confirmed. I'll start the migration script tomorrow after we merge the current PR."),
        models.TranscriptSegment(meeting_id=m2.id, speaker_name="David",    start_time=17.8, end_time=21.0, text="Got it. I'll update the connection string config and the test fixtures in parallel."),
    ])

    db.add_all([
        models.ActionItem(meeting_id=m2.id, description="Merge Frontend PR #142", is_completed=True,  assignee="David"),
        models.ActionItem(meeting_id=m2.id, description="Start PostgreSQL migration script", is_completed=False, assignee="Abhishek"),
        models.ActionItem(meeting_id=m2.id, description="Update connection string config and test fixtures for PostgreSQL", is_completed=False, assignee="David"),
    ])

    db.add_all([
        models.MeetingTopic(meeting_id=m2.id, topic_id=topics["Engineering"].id),
    ])

    # ─────────────────────────────────────────────────────────────────────────
    # MEETING 3 — Customer Discovery Call: TechCorp
    # ─────────────────────────────────────────────────────────────────────────
    m3 = models.Meeting(
        user_id=user.id,
        title="Customer Discovery Call: TechCorp",
        meeting_date=datetime(2023, 10, 10, 14, 0, 0),
        duration_seconds=2700,
        summary=(
            "Discovery call with TechCorp's Head of Engineering, Emma Chen. "
            "Key pain point: meeting overload with no actionable follow-up system. "
            "They currently use manual Google Docs for notes. Strong fit for our "
            "auto-summary and action item extraction features. Potential enterprise deal."
        ),
        status="completed",
    )
    db.add(m3)
    db.flush()

    db.add_all([
        models.Participant(meeting_id=m3.id, name="Abhishek"),
        models.Participant(meeting_id=m3.id, name="Emma Chen"),
    ])

    db.add_all([
        models.TranscriptSegment(meeting_id=m3.id, speaker_name="Abhishek",  start_time=0.5,  end_time=6.0,  text="Hi Emma, thanks for taking the time. I'd love to understand how your team currently handles meeting notes."),
        models.TranscriptSegment(meeting_id=m3.id, speaker_name="Emma Chen", start_time=6.3,  end_time=14.0, text="Honestly, it's a mess. We do 30+ meetings a week and our engineers spend an hour every Friday just compiling action items from Google Docs."),
        models.TranscriptSegment(meeting_id=m3.id, speaker_name="Abhishek",  start_time=14.2, end_time=19.0, text="That's exactly what we solve. Our AI extracts action items automatically and links them directly to the transcript."),
        models.TranscriptSegment(meeting_id=m3.id, speaker_name="Emma Chen", start_time=19.3, end_time=26.0, text="What about the transcript itself? Do you support Zoom, Teams, and Google Meet? We use all three depending on the client."),
        models.TranscriptSegment(meeting_id=m3.id, speaker_name="Abhishek",  start_time=26.2, end_time=31.0, text="Yes, we integrate with all three. The bot joins the call automatically and transcribes in real-time."),
        models.TranscriptSegment(meeting_id=m3.id, speaker_name="Emma Chen", start_time=31.3, end_time=37.5, text="Interesting. What does enterprise pricing look like? We have about 200 engineers who would use this."),
        models.TranscriptSegment(meeting_id=m3.id, speaker_name="Abhishek",  start_time=37.8, end_time=43.0, text="For 200 seats, we'd be looking at a custom enterprise agreement. Let me send you a proposal by end of week."),
        models.TranscriptSegment(meeting_id=m3.id, speaker_name="Emma Chen", start_time=43.2, end_time=47.0, text="Perfect. Can you also include a data security and compliance overview? We're SOC 2 required."),
    ])

    db.add_all([
        models.ActionItem(meeting_id=m3.id, description="Send enterprise pricing proposal to Emma Chen at TechCorp", is_completed=False, assignee="Abhishek"),
        models.ActionItem(meeting_id=m3.id, description="Prepare SOC 2 compliance and data security overview document", is_completed=False, assignee="Abhishek"),
        models.ActionItem(meeting_id=m3.id, description="Schedule product demo with TechCorp engineering team", is_completed=False, assignee="Abhishek"),
    ])

    db.add_all([
        models.MeetingTopic(meeting_id=m3.id, topic_id=topics["Customers"].id),
        models.MeetingTopic(meeting_id=m3.id, topic_id=topics["Strategy"].id),
    ])

    # ─────────────────────────────────────────────────────────────────────────
    # MEETING 4 — Design Review: Dashboard Redesign
    # ─────────────────────────────────────────────────────────────────────────
    m4 = models.Meeting(
        user_id=user.id,
        title="Design Review: Dashboard Redesign",
        meeting_date=datetime(2023, 10, 5, 11, 0, 0),
        duration_seconds=3300,
        summary=(
            "Design review for the dashboard redesign initiative. Team aligned on "
            "a new sidebar-first navigation pattern. Color system updated to match "
            "Fireflies brand guidelines. Accessibility audit scheduled. Component "
            "library migration from custom CSS to a structured design system approved."
        ),
        status="completed",
    )
    db.add(m4)
    db.flush()

    db.add_all([
        models.Participant(meeting_id=m4.id, name="Abhishek"),
        models.Participant(meeting_id=m4.id, name="Priya"),
        models.Participant(meeting_id=m4.id, name="Alex"),
    ])

    db.add_all([
        models.TranscriptSegment(meeting_id=m4.id, speaker_name="Priya",    start_time=0.5,  end_time=7.0,  text="I've shared the Figma link in the channel. The main change is moving from a top-nav to a sidebar-first layout."),
        models.TranscriptSegment(meeting_id=m4.id, speaker_name="Alex",     start_time=7.2,  end_time=13.0, text="I like the sidebar approach. It scales much better when we add more features. Top nav gets crowded fast."),
        models.TranscriptSegment(meeting_id=m4.id, speaker_name="Abhishek", start_time=13.2, end_time=18.5, text="Agreed. I also noticed the color palette shifted. Are we moving away from the current purple?"),
        models.TranscriptSegment(meeting_id=m4.id, speaker_name="Priya",    start_time=18.8, end_time=25.0, text="No, purple stays as the primary brand color. We're just standardizing the shades — primary is now #6D1A75 across all components."),
        models.TranscriptSegment(meeting_id=m4.id, speaker_name="Alex",     start_time=25.2, end_time=31.0, text="Have we done an accessibility audit on the new contrast ratios? We need to hit WCAG AA."),
        models.TranscriptSegment(meeting_id=m4.id, speaker_name="Priya",    start_time=31.3, end_time=36.5, text="Not yet. That's on my list for this week. I'll run it through the axe DevTools checker."),
        models.TranscriptSegment(meeting_id=m4.id, speaker_name="Abhishek", start_time=36.8, end_time=42.0, text="Good. Alex, can you start on the component migration? Let's use the new design tokens from Priya's system."),
        models.TranscriptSegment(meeting_id=m4.id, speaker_name="Alex",     start_time=42.2, end_time=47.0, text="Sure. I'll start with the Button and Input components since they're used everywhere."),
    ])

    db.add_all([
        models.ActionItem(meeting_id=m4.id, description="Run WCAG AA accessibility audit on new color system", is_completed=True,  assignee="Priya"),
        models.ActionItem(meeting_id=m4.id, description="Migrate Button and Input components to new design tokens", is_completed=False, assignee="Alex"),
        models.ActionItem(meeting_id=m4.id, description="Publish updated Figma design system to shared team library", is_completed=True,  assignee="Priya"),
        models.ActionItem(meeting_id=m4.id, description="Document sidebar navigation pattern in component docs", is_completed=False, assignee="Alex"),
    ])

    db.add_all([
        models.MeetingTopic(meeting_id=m4.id, topic_id=topics["Design"].id),
        models.MeetingTopic(meeting_id=m4.id, topic_id=topics["Product"].id),
    ])

    # ─────────────────────────────────────────────────────────────────────────
    # MEETING 5 — Investor Pitch Preparation
    # ─────────────────────────────────────────────────────────────────────────
    m5 = models.Meeting(
        user_id=user.id,
        title="Investor Pitch Preparation",
        meeting_date=datetime(2023, 9, 28, 15, 0, 0),
        duration_seconds=4200,
        summary=(
            "Prep session for the Series A pitch deck. Team aligned on core narrative: "
            "AI-powered meeting intelligence for async-first teams. Key metrics to "
            "highlight: 2,000 MAUs, 40% MoM growth, NPS of 72. Financial model reviewed "
            "and conservative projections finalized. Pitch rehearsal scheduled for Monday."
        ),
        status="completed",
    )
    db.add(m5)
    db.flush()

    db.add_all([
        models.Participant(meeting_id=m5.id, name="Abhishek"),
        models.Participant(meeting_id=m5.id, name="Sarah"),
        models.Participant(meeting_id=m5.id, name="James"),
    ])

    db.add_all([
        models.TranscriptSegment(meeting_id=m5.id, speaker_name="James",    start_time=0.5,  end_time=7.0,  text="I've reviewed the deck. The product story is strong but we need a clearer market size slide. Investors will ask about TAM immediately."),
        models.TranscriptSegment(meeting_id=m5.id, speaker_name="Abhishek", start_time=7.3,  end_time=13.5, text="Agreed. The meeting intelligence market is $4.2B today growing to $14B by 2028. We should lead with that."),
        models.TranscriptSegment(meeting_id=m5.id, speaker_name="Sarah",    start_time=13.8, end_time=20.0, text="I'd also recommend weaving in a customer quote early. The TechCorp discovery call had great soundbites about pain points."),
        models.TranscriptSegment(meeting_id=m5.id, speaker_name="James",    start_time=20.2, end_time=27.0, text="Good point. The traction slide is strong — 2,000 MAUs and 40% MoM growth is genuinely impressive for month six."),
        models.TranscriptSegment(meeting_id=m5.id, speaker_name="Abhishek", start_time=27.3, end_time=33.0, text="We should also address the competitive landscape proactively. Fireflies and Otter.ai are the obvious comparisons."),
        models.TranscriptSegment(meeting_id=m5.id, speaker_name="James",    start_time=33.2, end_time=39.5, text="Our differentiator is the database-first approach — structured, queryable meeting data. That's not a feature, that's an architectural moat."),
        models.TranscriptSegment(meeting_id=m5.id, speaker_name="Sarah",    start_time=39.8, end_time=44.0, text="I'll update the financials slide. Should we show conservative or aggressive projections?"),
        models.TranscriptSegment(meeting_id=m5.id, speaker_name="James",    start_time=44.2, end_time=49.0, text="Conservative with aggressive upside scenario. Investors respect founders who know the difference."),
        models.TranscriptSegment(meeting_id=m5.id, speaker_name="Abhishek", start_time=49.3, end_time=53.5, text="Let's schedule a full rehearsal Monday. James, can you play devil's advocate on the Q&A?"),
    ])

    db.add_all([
        models.ActionItem(meeting_id=m5.id, description="Update TAM/SAM/SOM market size slide with $4.2B figure", is_completed=True,  assignee="Abhishek"),
        models.ActionItem(meeting_id=m5.id, description="Add TechCorp customer quote to problem slide", is_completed=True,  assignee="Sarah"),
        models.ActionItem(meeting_id=m5.id, description="Revise financial model with conservative and aggressive scenarios", is_completed=False, assignee="Sarah"),
        models.ActionItem(meeting_id=m5.id, description="Schedule Monday pitch rehearsal with James as Q&A moderator", is_completed=False, assignee="Abhishek"),
        models.ActionItem(meeting_id=m5.id, description="Prepare competitive differentiation one-pager for appendix", is_completed=False, assignee="James"),
    ])

    db.add_all([
        models.MeetingTopic(meeting_id=m5.id, topic_id=topics["Investors"].id),
        models.MeetingTopic(meeting_id=m5.id, topic_id=topics["Strategy"].id),
    ])

    # ── Final commit ──────────────────────────────────────────────────────────
    db.commit()
    print("OK: Database seeded — 5 meetings, participants, transcripts, action items, and topics.")
    db.close()


if __name__ == "__main__":
    seed()