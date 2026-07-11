// UNWRITTEN — the recovered fragments, read after each level (1–19).
'use strict';

UW.LETTERS = {
  1: { to: 'To Miss Georgina Hogarth', text:
    "Georgy — I climbed to the attic today, the one I swore I should never enter again. Dust an inch deep, and under a loose board, a boy's handwriting. Mine. From the year of the blacking-warehouse, when I pasted labels and told no one, ever. I have written five hundred characters since, and every orphan among them was that boy in the rafters. Say nothing of this." },
  2: { to: 'To John Forster', text:
    "My Dear Forster, the river air is foul tonight. I walked the docks until three in the morning, unable to sleep. I swear to you, John, I saw him — the waterman from my latest pages, dragging something terrible behind his boat. I begin to fear I do not invent these people, but merely report on the phantoms that already stalk me." },
  3: { to: 'To Miss Angela Burdett-Coutts', text:
    "Dear Miss Coutts, I toured the workhouse you asked after. The gruel is thinner than the mercy. A small boy held up his bowl to me — held it up, Angela, exactly as I once wrote it — and the master struck it down. I invented that scene, or believed I did. Now I suspect the scene was waiting for me all along, patient as hunger." },
  4: { to: 'To Mr. Wilkie Collins', text:
    "Wilkie — spent an hour in a curiosity shop off Leicester Square, all clocks and birdcages stacked to the rot of the ceiling. Every clock stopped at a different hour, and I had the sudden horror that each was the hour of somebody's death, catalogued and priced. I bought nothing. I ran, if you must know. A man of my age, running from furniture." },
  5: { to: 'To W. H. Wills, Household Words', text:
    "Wills — I followed a pickpocket half across the rooftops of Seven Dials tonight, for no reason I can defend in daylight. He moved exactly as I wrote the Dodger, wrist and heel. When he saw me he laughed and called me 'guv' and vanished down a chimney stack. If my creations are loose in the world, they at least seem to be enjoying themselves. I am not." },
  6: { to: 'To John Forster (never sent)', text:
    "John — you alone know my father lodged in the Marshalsea, and that I visited him there, a child among the debtors. Today I stood in the yard again. The prison is closed, the walls are coming down, and yet I heard the turnkey's ring of keys plain as church bells. My shadow on the bricks was smaller than it should be. It was a boy's shadow, John." },
  7: { to: 'To Mr. Thomas Talfourd', text:
    "My dear Talfourd — Chancery again, and my suit no nearer daylight. I sat below the Lord Chancellor in his fog and watched a cause called that was older than the counsel arguing it. The documents have begun to outnumber the living. I platformed — forgive me, I mean I climbed — over a stack of affidavits taller than my house. One day I shall put the whole rotten court in a book, fog and all." },
  8: { to: 'To Catherine Dickens', text:
    "Catherine — the printery at two in the morning is a kind of iron forest. The presses came down like judgments, over and over, printing my words faster than I can regret them. I put my hand on a fresh sheet and the ink was still warm, like something alive. Twenty years ago I should have called that thrilling. Tonight I only counted the copies, and thought: none of it can be called back now. Not one line." },
  9: { to: 'To Hans Christian Andersen', text:
    "My dear Andersen — I was in the great Reading Room today, under the dome, where every book ever printed seems to breathe together. A page of manuscript rose in the updraft and hung above me like a gull. The attendants shushed me for laughing. Imagine it — shushed, at my age, in the temple of my own trade. You would have made a fairy tale of it. I made only this letter." },
  10: { to: 'To Mr. Wilkie Collins', text:
    "Wilkie, I must confess a strange occurrence. I visited the old ruins we spoke of, and found a scrap of yellowed lace caught upon the briars. A bridal veil, quite rotted through. I held it, and felt such a sudden, crushing despair that I had to sit in the dirt. I fear she is becoming too real to me. The clocks there had all stopped at twenty minutes to nine." },
  11: { to: 'To Miss Georgina Hogarth', text:
    "Georgy — the Channel was a beast. The packet rolled so that the horizon stood first at the masthead and then under my boots, and every gentleman aboard pretended composure while privately arranging his soul. I braced in the lee of the funnel and thought how a man's life tilts the same way — slowly, then all at once — and nobody aboard will admit the deck is moving." },
  12: { to: 'To John Forster', text:
    "John — Paris, and beneath Paris. They took me down into the catacombs with a single lantern between five of us. Walls of femurs, stacked neat as library shelves. Six million Parisians filed and forgotten. I thought: here is the one archive that keeps no letters. When the lantern guttered I heard, quite distinctly, a page turn. I did not mention it to the guide." },
  13: { to: 'Unsigned. Unaddressed. (For E.T.)', text:
    "— Venice tonight is the colour of a bruise, and twice as tender. I rode a gondola past palazzos sinking by inches, each one certain of its own permanence. I thought of you, which I have promised certain persons I would not do, and so this letter will have no name on it, and no signature, and will go into the satchel with the rest. Some things are burned before they are even posted." },
  14: { to: 'To Catherine Dickens', text:
    "Catherine, they call this the New World, but the misery is older than time. The mud of Five Points is thicker than our London fog. Today I saw a boy, no older than our own Charley, pick a gentleman's pocket with the exact, terrifying grace of the Artful Dodger. Have I somehow willed this wretchedness into being by writing of it so often?" },
  15: { to: 'To W. H. Wills', text:
    "Wills — homeward, and below decks. I went down to see the stokers at the furnaces, a descent Dante would have recognised. Coal on the conveyors like a black river running uphill. The men sang to keep time with the shovels. I stood in the heat until my eyes streamed, and understood that everything I have ever published was carried, at some point, on somebody's back." },
  16: { to: 'To Mr. Henry Austin', text:
    "My dear Henry — you asked for my observations on the new sewers, and here they are: I have seen the underside of London, and it is honester than the top. The tide came through the brickwork channels with a sound like applause, and the rats attended me the whole way, a most faithful public. Whatever the city buries, Henry, comes back with the water. Remember that. I cannot stop remembering it." },
  17: { to: 'To his son, Charley', text:
    "My dear Charley — Christmas Eve, and snowing in earnest. I walked home late past windows the colour of hot brandy, and I will tell you a thing I would tell no one else: I saw three figures in the snowfall, one after another, and each of them looked at me as if it knew me, and each of them was gone when I turned. I invented that story, Charley. I wrote it in six weeks for the money. So why do they come to check on me?" },
  18: { to: 'To Miss Angela Burdett-Coutts', text:
    "Dear Angela, the workhouse project is noble, but the cold out here on the Kent marshes seeps into the bone. A mist rolled in tonight, and through it I heard the distinct, heavy clank of iron chains. I know they say the hulks are empty now. But the ghosts of those chained men refuse to leave my mind — or my manuscript." },
  19: { to: 'To John Forster', text:
    "John — I was in the Staplehurst accident. The carriage hung over the bridge at an angle I do not care to reproduce on paper. I climbed out at the window, and went down to the dying with my brandy flask and my hat full of water, and when I had done what a man could do, I remembered — and climbed back into that hanging carriage — for my manuscript. And for the satchel. You know what is in the satchel, John. I could not leave it to be read." }
};

// The bonfire narration + credits (level 20).
UW.FINALE = [
  "Gad's Hill Place, Kent. September, 1860.",
  "In the field behind the house, his children carried out basket after basket of letters.",
  "Thirty years of correspondence — Forster, Collins, Catherine, half the writers of the age —",
  "and he fed every page to the fire himself.",
  "The children roasted onions in the ashes.",
  '"Would to God every letter I have ever written was on that pile," he said.',
  "He burned every letter he ever received.",
  "The rest, he left unwritten."
];

UW.CREDITS = [
  '', 'UNWRITTEN', '',
  'A platformer in nineteen letters', '',
  'In memory of the bonfire at Gad\'s Hill,', '3rd September 1860', '',
  'With apologies and admiration to', 'CHARLES DICKENS', '1812 - 1870', '',
  'Everything the hazards whispered', 'he wrote down first:', '',
  'Oliver Twist  ·  Great Expectations', 'Bleak House  ·  Little Dorrit',
  'A Tale of Two Cities  ·  David Copperfield', 'A Christmas Carol  ·  The Old Curiosity Shop',
  'The Mystery of Edwin Drood', '(unfinished)', '',
  'Thank you for reading.', '', 'THE END'
];
