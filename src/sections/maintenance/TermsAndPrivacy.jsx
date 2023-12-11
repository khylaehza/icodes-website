import React from 'react';
import { CusModalTAP } from '../../customs';
import { Flex, Text, Link, UnorderedList, ListItem } from '@chakra-ui/react';

export const TermsAndCondition = ({ onOpen, onclose, isOpen }) => {
	const Child = () => {
		return (
			<Flex
				flexDir={'column'}
				gap={3}
				textAlign={'justify'}
			>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					Last updated December 01, 2023{' '}
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					AGREEMENT TO OUR LEGAL TERMS{' '}
				</Text>
				<Text>
					We are Congressional Town Center - ICODES: An Interactive
					Condo Unit System with Decision Support (
					<Text as={'b'}>"Company"</Text>, <Text as={'b'}>"we",</Text>{' '}
					<Text as={'b'}>"us",</Text> <Text as={'b'}>"our"</Text>), a
					company registered in the Philippines at 23 Bahay Toro
					Avenue, Quezon City, National Capital Region 1105.
				</Text>
				<Text>
					We operate the website{' '}
					<Link
						href='https://www.ctcqcicodes.com'
						color={'#2a6ac9'}
					>
						https://www.ctcqcicodes.com
					</Link>{' '}
					(the <Text as={'b'}>"Site"</Text>), as well as any other
					related products and services that refer or link to these
					legal terms (the <Text as={'b'}>"Legal Terms"</Text>)
					(collectively, the <Text as={'b'}>"Services"</Text>).
				</Text>
				<Text
					fontWeight='bold'
					fontStyle='italic'
				>
					ICODES: An Interactive Condo Unit System with Decision
					Support for Congressional Town Center of Quezon City We
					provide a system that caters to the needs of employees,
					agents, condo unit owners, and prospective buyers of the
					Congressional Town Center of Quezon City. The ICODES manages
					the Administration, Front Desk, Property Management,
					Accounting Management, Sales Management. Furthermore, the
					ICODES provides Decision Support System and Interactive
					System for Prospective Buyers.
				</Text>
				<Text>
					You can contact us by phone at 09297560675/09915465204,
					email at ctcqcicodes@gmail.com, or by mail to 23 Bahay Toro
					Avenue, Quezon City, National Capital Region 1105,
					Philippines.
				</Text>
				<Text>
					<Text as={'b'}>
						These Legal Terms constitute a legally binding agreement
						made between you, whether personally or on behalf of an
						entity ("you"), and Congressional Town Center - ICODES:
						An Interactive Condo Unit System with Decision Support,
						concerning your access to and use of the Services. You
						agree that by accessing the Services, you have read,
						understood, and agreed to be bound by all of these Legal
						Terms.
					</Text>
					IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU
					ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU
					MUST DISCONTINUE USE IMMEDIATELY.
				</Text>
				<Text>
					Supplemental terms and conditions or documents that may be
					posted on the Services from time to time are hereby
					expressly incorporated herein by reference. We reserve the
					right, in our sole discretion, to make changes or
					modifications to these Legal Terms from time to time. We
					will alert you about any changes by updating the "Last
					updated" date of these Legal Terms, and you waive any right
					to receive specific notice of each such change. It is your
					responsibility to periodically review these Legal Terms to
					stay informed of updates. You will be subject to, and will
					be deemed to have been made aware of and to have accepted,
					the changes in any revised Legal Terms by your continued use
					of the Services after the date such revised Legal Terms are
					posted.
				</Text>
				<Text>
					The Services are intended for users who are at least 18
					years old. Persons under the age of 18 are not permitted to
					use or register for the Services.
				</Text>
				<Text>
					We recommend that you print a copy of these Legal Terms for
					your records.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					1. OUR SERVICES{' '}
				</Text>
				<Text>
					The information provided when using the Services is not
					intended for distribution to or use by any person or entity
					in any jurisdiction or country where such distribution or
					use would be contrary to law or regulation or which would
					subject us to any registration requirement within such
					jurisdiction or country. Accordingly, those persons who
					choose to access the Services from other locations do so on
					their own initiative and are solely responsible for
					compliance with local laws, if and to the extent local laws
					are applicable.
				</Text>
				<Text>
					The Services are not tailored to comply with
					industry-specific regulations (Health Insurance Portability
					and Accountability Act (HIPAA), Federal Information Security
					Management Act (FISMA), etc.), so if your interactions would
					be subjected to such laws, you may not use the Services. You
					may not use the Services in a way that would violate the
					Gramm-Leach-Bliley Act (GLBA).
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					2. INTELLECTUAL PROPERTY RIGHTS
				</Text>
				<Text
					fontSize={'l'}
					as={'b'}
				>
					Our intellectual property{' '}
				</Text>
				<Text>
					We are the owner or the licensee of all intellectual
					property rights in our Services, including all source code,
					databases, functionality, software, website designs, audio,
					video, text, photographs, and graphics in the Services
					(collectively, the "Content"), as well as the trademarks,
					service marks, and logos contained therein (the "Marks").
				</Text>
				<Text>
					Our Content and Marks are protected by copyright and
					trademark laws (and various other intellectual property
					rights and unfair competition laws) and treaties in the
					United States and around the world.
				</Text>
				<Text>
					The Content and Marks are provided in or through the
					Services "AS IS" for your personal, non-commercial use or
					internal business purposes only.
				</Text>
				<Text
					fontSize={'l'}
					as={'b'}
				>
					Your use of our Services{' '}
				</Text>
				<Text>
					Subject to your compliance with these Legal Terms, including
					the "PROHIBITED ACTIVITIES" section below, we grant you a
					non-exclusive, non-transferable, revocable license to:
				</Text>
				<UnorderedList
					pl={10}
					spacing={3}
				>
					<ListItem>access the Services; and</ListItem>
					<ListItem>
						download or print a copy of any portion of the Content
						to which you have properly gained access.
					</ListItem>
				</UnorderedList>
				<Text>
					solely for your personal, non-commercial use or internal
					business purposes.
				</Text>
				<Text>
					Except as set out in this section or elsewhere in our Legal
					Terms, no part of the Services and no Content or Marks may
					be copied, reproduced, aggregated, republished, uploaded,
					posted, publicly displayed, encoded, translated,
					transmitted, distributed, sold, licensed, or otherwise
					exploited for any commercial purpose whatsoever, without our
					express prior written permission.
				</Text>
				<Text>
					If you wish to make any use of the Services, Content, or
					Marks other than as set out in this section or elsewhere in
					our Legal Terms, please address your request to:{' '}
					<Text as={'b'}>ctcqcicodes@gmail.com.</Text> If we ever
					grant you the permission to post, reproduce, or publicly
					display any part of our Services or Content, you must
					identify us as the owners or licensors of the Services,
					Content, or Marks and ensure that any copyright or
					proprietary notice appears or is visible on posting,
					reproducing, or displaying our Content.
				</Text>
				<Text>
					We reserve all rights not expressly granted to you in and to
					the Services, Content, and Marks.
				</Text>
				<Text>
					Any breach of these Intellectual Property Rights will
					constitute a material breach of our Legal Terms and your
					right to use our Services will terminate immediately.
				</Text>
				<Text
					fontSize={'l'}
					as={'b'}
				>
					Your submissions and contributions
				</Text>
				<Text>
					Please review this section and the "PROHIBITED ACTIVITIES"
					section carefully prior to using our Services to understand
					the (a) rights you give us and (b) obligations you have when
					you post or upload any content through the Services.
				</Text>
				<Text>
					<Text as={'b'}>Submissions</Text>: By directly sending us
					any question, comment, suggestion, idea, feedback, or other
					information about the Services ("Submissions"), you agree to
					assign to us all intellectual property rights in such
					Submission. You agree that we shall own this Submission and
					be entitled to its unrestricted use and dissemination for
					any lawful purpose, commercial or otherwise, without
					acknowledgment or compensation to you.
				</Text>
				<Text>
					<Text as={'b'}>Contributions</Text>: The Services may invite
					you to chat, contribute to, or participate in blogs, message
					boards, online forums, and other functionality during which
					you may create, submit, post, display, transmit, publish,
					distribute, or broadcast content and materials to us or
					through the Services, including but not limited to text,
					writings, video, audio, photographs, music, graphics,
					comments, reviews, rating suggestions, personal information,
					or other material ("Contributions"). Any Submission that is
					publicly posted shall also be treated as a Contribution.
				</Text>
				<Text>
					You understand that Contributions may be viewable by other
					users of the Services.
				</Text>
				<Text>
					<Text as={'b'}>
						When you post Contributions, you grant us a license
						(including use of your name, trademarks, and logos):
					</Text>{' '}
					By posting any Contributions, you grant us an unrestricted,
					unlimited, irrevocable, perpetual, non-exclusive,
					transferable, royalty-free, fully-paid, worldwide right, and
					license to: use, copy, reproduce, distribute, sell, resell,
					publish, broadcast, retitle, store, publicly perform,
					publicly display, reformat, translate, excerpt (in whole or
					in part), and exploit your Contributions (including, without
					limitation, your image, name, and voice) for any purpose,
					commercial, advertising, or otherwise, to prepare derivative
					works of, or incorporate into other works, your
					Contributions, and to sublicense the licenses granted in
					this section. Our use and distribution may occur in any
					media formats and through any media channels.
				</Text>
				<Text>
					This license includes our use of your name, company name,
					and franchise name, as applicable, and any of the
					trademarks, service marks, trade names, logos, and personal
					and commercial images you provide.
				</Text>
				<Text>
					<Text as={'b'}>
						You are responsible for what you post or upload:
					</Text>{' '}
					By sending us Submissions and/or posting Contributions
					through any part of the Services or making Contributions
					accessible through the Services by linking your account
					through the Services to any of your social networking
					accounts, you:
				</Text>
				<UnorderedList
					pl={10}
					spacing={3}
				>
					<ListItem>
						confirm that you have read and agree with our
						"PROHIBITED ACTIVITIES" and will not post, send,
						publish, upload, or transmit through the Services any
						Submission nor post any Contribution that is illegal,
						harassing, hateful, harmful, defamatory, obscene,
						bullying, abusive, discriminatory, threatening to any
						person or group, sexually explicit, false, inaccurate,
						deceitful, or misleading:
					</ListItem>
					<ListItem>
						to the extent permissible by applicable law, waive any
						and all moral rights to any such Submission and/or
						Contribution;
					</ListItem>
					<ListItem>
						warrant that any such Submission and/or Contributions
						are original to you or that you have the necessary
						rights and licenses to submit such Submissions and/or
						Contributions and that you have full authority to grant
						us the above-mentioned rights in relation to your
						Submissions and/or Contributions; and
					</ListItem>
					<ListItem>
						warrant and represent that your Submissions and/or
						Contributions do not constitute confidential
						information.
					</ListItem>
				</UnorderedList>
				<Text>
					You are solely responsible for your Submissions and/or
					Contributions and you expressly agree to reimburse us for
					any and all losses that we may suffer because of your breach
					of (a) this section, (b) any third party's intellectual
					property rights, or (c) applicable law.
				</Text>
				<Text>
					<Text as={'b'}>We may remove or edit your Content:</Text>
					Text Although we have no obligation to monitor any
					Contributions, we shall have the right to remove or edit any
					Contributions at any time without notice if in our
					reasonable opinion we consider such Contributions harmful or
					in breach of these Legal Terms. If we remove or edit any
					such Contributions, we may also suspend or disable your
					account and report you to the authorities.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					3. USER REPRESENTATIONS{' '}
				</Text>
				<Text>
					By using the Services, you represent and warrant that: (1)
					all registration information you submit will be true,
					accurate, current, and complete; (2) you will maintain the
					accuracy of such information and promptly update such
					registration information as necessary; (3) you have the
					legal capacity and you agree to comply with these Legal
					Terms; (4) you are not a minor in the jurisdiction in which
					you reside; (5) you will not access the Services through
					automated or non-human means, whether through a bot, script
					or otherwise; (6) you will not use the Services for any
					illegal or unauthorized purpose; and (7) your use of the
					Services will not violate any applicable law or regulation.
				</Text>
				<Text>
					If you provide any information that is untrue, inaccurate,
					not current, or incomplete, we have the right to suspend or
					terminate your account and refuse any and all current or
					future use of the Services (or any portion thereof).
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					4. USER REGISTRATION{' '}
				</Text>
				<Text>
					You may be required to register to use the Services. You
					agree to keep your password confidential and will be
					responsible for all use of your account and password. We
					reserve the right to remove, reclaim, or change a username
					you select if we determine, in our sole discretion, that
					such username is inappropriate, obscene, or otherwise
					objectionable.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					5. PROHIBITED ACTIVITIES{' '}
				</Text>
				<Text>
					You may not access or use the Services for any purpose other
					than that for which we make the Services available. The
					Services may not be used in connection with any commercial
					endeavors except those that are specifically endorsed or
					approved by us.
				</Text>
				<Text>As a user of the Services, you agree not to:</Text>
				<UnorderedList
					pl={12}
					spacing={3}
				>
					<ListItem>
						Systematically retrieve data or other content from the
						Services to create or compile, directly or indirectly, a
						collection, compilation, database, or directory without
						written permission from us.
					</ListItem>
					<ListItem>
						Trick, defraud, or mislead us and other users,
						especially in any attempt to learn sensitive account
						information such as user passwords.
					</ListItem>
					<ListItem>
						Circumvent, disable, or otherwise interfere with
						security-related features of the Services, including
						features that prevent or restrict the use or copying of
						any Content or enforce limitations on the use of the
						Services and/or the Content contained therein.
					</ListItem>
					<ListItem>
						Disparage, tarnish, or otherwise harm, in our opinion,
						us and/or the Services
					</ListItem>
					<ListItem>
						Use any information obtained from the Services in order
						to harass, abuse, or harm another person.
					</ListItem>
					<ListItem>
						Make improper use of our support services or submit
						false reports of abuse or misconduct.
					</ListItem>
					<ListItem>
						Use the Services in a manner inconsistent with any
						applicable laws or regulations.
					</ListItem>
					<ListItem>
						Engage in unauthorized framing of or linking to the
						Services.
					</ListItem>
					<ListItem>
						Upload or transmit (or attempt to upload or to transmit)
						viruses, Trojan horses, or other material, including
						excessive use of capital letters and spamming
						(continuous posting of repetitive text), that interferes
						with any party's uninterrupted use and enjoyment of the
						Services or modifies, impairs, disrupts, alters, or
						interferes with the use, features, functions, operation,
						or maintenance of the Services.
					</ListItem>
					<ListItem>
						Engage in any automated use of the system, such as using
						scripts to send comments or messages, or using any data
						mining, robots, or similar data gathering and extraction
						tools. Delete the copyright or other proprietary rights
						notice from any Content.
					</ListItem>
					<ListItem>
						Attempt to impersonate another user or person or use the
						username of another user.
					</ListItem>
					<ListItem>
						Upload or transmit (or attempt to upload or to transmit)
						any material that acts as a passive or active
						information collection or transmission mechanism,
						including without limitation, clear graphics interchange
						formats ("gifs"), 1x1 pixels, web bugs, cookies, or
						other similar devices (sometimes referred to as
						"spyware" or "passive collection mechanisms" or "pcms").
					</ListItem>
					<ListItem>
						Interfere with, disrupt, or create an undue burden on
						the Services or the networks or services connected to
						the Services.
					</ListItem>
					<ListItem>
						Harass, annoy, intimidate, or threaten any of our
						employees or agents engaged in providing any portion of
						the Services to you.
					</ListItem>
					<ListItem>
						Attempt to bypass any measures of the Services designed
						to prevent or restrict access to the Services, or any
						portion of the Services.
					</ListItem>
					<ListItem>
						Copy or adapt the Services' software, including but not
						limited to Flash, PHP, HTML, JavaScript, or other code.
						Except as permitted by applicable law, decipher,
						decompile, disassemble, or reverse engineer any of the
						software comprising or in any way making up a part of
						the Services.
					</ListItem>
					<ListItem>
						Except as may be the result of standard search engine or
						Internet browser usage, use, launch, develop, or
						distribute any automated system, including without
						limitation, any spider, robot, cheat utility, scraper,
						or offline reader that accesses the Services, or use or
						launch any unauthorized script or other software.
					</ListItem>
					<ListItem>
						Use a buying agent or purchasing agent to make purchases
						on the Services.
					</ListItem>
					<ListItem>
						Make any unauthorized use of the Services, including
						collecting usernames and/or email addresses of users by
						electronic or other means for the purpose of sending
						unsolicited email, or creating user accounts by
						automated means or under false pretenses.
					</ListItem>
					<ListItem>
						Use the Services as part of any effort to compete with
						us or otherwise use the Services and/or the Content for
						any revenue-generating endeavor or commercial
						enterprise.
					</ListItem>
				</UnorderedList>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					6. USER GENERATED CONTRIBUTIONS
				</Text>
				<Text>
					The Services may invite you to chat, contribute to, or
					participate in blogs, message boards, online forums, and
					other functionality, and may provide you with the
					opportunity to create, submit, post, display, transmit,
					perform, publish, distribute, or broadcast content and
					materials to us or on the Services, including but not
					limited to text, writings, video, audio, photographs,
					graphics, comments, suggestions, or personal information or
					other material (collectively, "Contributions").
					Contributions may be viewable by other users of the Services
					and through third-party websites. As such, any Contributions
					you transmit may be treated as non-confidential and
					non-proprietary. When you create or make available any
					Contributions, you thereby represent and warrant that:
				</Text>

				<UnorderedList
					pl={12}
					spacing={3}
				>
					<ListItem>
						The creation, distribution, transmission, public
						display, or performance, and the accessing, downloading,
						or copying of your Contributions do not and will not
						infringe the proprietary rights, including but not
						limited to the copyright, patent, trademark, trade
						secret, or moral rights of any third party.
					</ListItem>
					<ListItem>
						You are the creator and owner of or have the necessary
						licenses, rights, consents, releases, and permissions to
						use and to authorize us, the Services, and other users
						of the Services to use your Contributions in any manner
						contemplated by the Services and these Legal Terms.
					</ListItem>
					<ListItem>
						You have the written consent, release, and/or permission
						of each and every identifiable individual person in your
						Contributions to use the name or likeness of each and
						every such identifiable individual person to enable
						inclusion and use of your Contributions in any manner
						contemplated by the Services and these Legal Terms.
					</ListItem>
					<ListItem>
						Your Contributions are not false, inaccurate, or
						misleading.
					</ListItem>
					<ListItem>
						Your Contributions are not unsolicited or unauthorized
						advertising, promotional materials, pyramid schemes,
						chain letters, spam, mass mailings, or other forms of
						solicitation.
					</ListItem>
					<ListItem>
						Your Contributions are not obscene, lewd, lascivious,
						filthy, violent, harassing, libelous, slanderous, or
						otherwise objectionable (as determined by us)
					</ListItem>
					<ListItem>
						Your Contributions do not ridicule, mock, disparage,
						intimidate, or abuse anyone
					</ListItem>
					<ListItem>
						Your Contributions are not used to harass or threaten
						(in the legal sense of those terms) any other person and
						to promote violence against a specific person or class
						of people.
					</ListItem>
					<ListItem>
						Your Contributions do not violate any applicable law,
						regulation, or rule.
					</ListItem>
					<ListItem>
						Your Contributions do not violate the privacy or
						publicity rights of any third party.
					</ListItem>
					<ListItem>
						Your Contributions do not violate any applicable law
						concerning child pornography, or otherwise intended to
						protect the health or well-being of minors.
					</ListItem>
					<ListItem>
						Your Contributions do not include any offensive comments
						that are connected to race, national origin, gender,
						sexual preference, or physical handicap.
					</ListItem>
					<ListItem>
						Your Contributions do not otherwise violate, or link to
						material that violates, any provision of these Legal
						Terms, or any applicable law or regulation.
					</ListItem>
				</UnorderedList>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					7. CONTRIBUTION LICENSE
				</Text>
				<Text>
					By posting your Contributions to any part of the Services,
					you automatically grant, and you represent and warrant that
					you have the right to grant, to us an unrestricted,
					unlimited, irrevocable, perpetual, non-exclusive,
					transferable, royalty-free, fully-paid, worldwide right, and
					license to host, use, copy, reproduce, disclose, sell,
					resell, publish, broadcast, retitle, archive, store, cache,
					publicly perform, publicly display, reformat, translate,
					transmit, excerpt (in whole or in part), and distribute such
					contributions (including, without limitation, your image and
					voice) for any purpose, commercial, advertising, or
					otherwise, and to prepare derivative works of, or
					incorporate into other works, such Contributions, and grant
					and authorize sublicenses of the foregoing. The use and
					distribution may occur in any media formats and through any
					media channels.
				</Text>
				<Text>
					This license will apply to any form, media, or technology
					now known or hereafter developed, and includes our use of
					your name, company name, and franchise name, as applicable,
					and any of the trademarks, service marks, trade names,
					logos, and personal and commercial images you provide. You
					waive all moral rights in your Contributions, and you
					warrant that moral rights have not otherwise been asserted
					in your Contributions.
				</Text>
				<Text>
					We do not assert any ownership over your Contributions. You
					retain full ownership of all of your Contributions and any
					intellectual property rights or other proprietary rights
					associated with your Contributions. We are not liable for
					any statements or representations in your Contributions
					provided by you in any area on the Services. You are solely
					responsible for your Contributions to the Services and you
					expressly agree to exonerate us from any and all
					responsibility and to refrain from any legal action against
					us regarding your Contributions. We have the right, in our
					sole and absolute discretion, (1) to edit, redact, or
					otherwise change any Contributions; (2) to re-categorize any
					Contributions to place them in more appropriate locations on
					the Services; and (3) to pre-screen or delete any
					Contributions at any time and for any reason, without
					notice. We have no obligation to monitor your Contributions.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					8. SERVICES MANAGEMENT
				</Text>
				<Text>
					We reserve the right, but not the obligation, to: (1)
					monitor the Services for violations of these Legal Terms;
					(2) take appropriate legal action against anyone who, in our
					sole discretion, violates the law or these Legal Terms,
					including without limitation, reporting such user to law
					enforcement authorities; (3) in our sole discretion and
					without limitation, refuse, restrict access to, limit the
					availability of, or disable (to the extent technologically
					feasible) any of your Contributions or any portion thereof,
					(4) in our sole discretion and without limitation, notice,
					or liability, to remove from the Services or otherwise
					disable all files and content that are excessive in size or
					are in any way burdensome to our systems; and (5) otherwise
					manage the Services in a manner designed to protect our
					rights and property and to facilitate the proper functioning
					of the Services.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					9. PRIVACY POLICY
				</Text>
				<Text>
					We care about data privacy and security. Please review our
					Privacy Policy:{' '}
					<Link
						href='https://www.freeprivacy policy.com/live/2ef50d75-4248-407f-bc2d-11b6bd0027cc.'
						color={'#2a6ac9'}
					>
						https://www.freeprivacy
						policy.com/live/2ef50d75-4248-407f-bc2d-11b6bd0027cc.
					</Link>
					By using the Services, you agree to be bound by our Privacy
					Policy, which is incorporated into these Legal Terms. Please
					be advised the Services are hosted in the Philippines. If
					you access the Services from any other region of the world
					with laws or other requirements governing personal data
					collection, use, or disclosure that differ from applicable
					laws in the Philippines, then through your continued use of
					the Services, you are transferring your data to the
					Philippines, and you expressly consent to have your data
					transferred to and processed in the Philippines.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					10. TERM AND TERMINATION
				</Text>
				<Text>
					These Legal Terms shall remain in full force and effect
					while you use the Services. WITHOUT LIMITING ANY OTHER
					PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN
					OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY
					ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING
					CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR
					NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY
					REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE
					LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY
					TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR
					DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU
					POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
				</Text>
				<Text>
					If we terminate or suspend your account for any reason, you
					are prohibited from registering and creating a new account
					under your name, a fake or borrowed name, or the name of any
					third party, even if you may be acting on behalf of the
					third party. In addition to terminating or suspending your
					account, we reserve the right to take appropriate legal
					action, including without limitation pursuing civil,
					criminal, and injunctive redress.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					11. MODIFICATIONS AND INTERRUPTIONS
				</Text>
				<Text>
					We reserve the right to change, modify, or remove the
					contents of the Services at any time or for any reason at
					our sole discretion without notice. However, we have no
					obligation to update any information on our Services. We
					will not be liable to you or any third party for any
					modification, price change, suspension, or discontinuance of
					the Services.
				</Text>
				<Text>
					We cannot guarantee the Services will be available at all
					times. We may experience hardware, software, or other
					problems or need to perform maintenance related to the
					Services, resulting in interruptions, delays, or errors. We
					reserve the right to change, revise, update, suspend,
					discontinue, or otherwise modify the Services at any time or
					for any reason without notice to you. You agree that we have
					no liability whatsoever for any loss, damage, or
					inconvenience caused by your inability to access or use the
					Services during any downtime or discontinuance of the
					Services. Nothing in these Legal Terms will be construed to
					obligate us to maintain and support the Services or to
					supply any corrections, updates, or releases in connection
					therewith.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					12. GOVERNING LAW
				</Text>
				<Text>
					<Text as={'b'}>
						These Legal Terms shall be governed by and defined
						following the laws of the Philippines. Congressional
						Town Center - ICODES: An Interactive Condo Unit System
						with Decision Support
					</Text>{' '}
					and yourself irrevocably consent that the courts of the
					Philippines shall have exclusive jurisdiction to resolve any
					dispute which may arise in connection with these Legal
					Terms.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					13. CORRECTIONS
				</Text>
				<Text>
					There may be information on the Services that contains
					typographical errors, inaccuracies, or omissions, including
					descriptions, pricing, availability, and various other
					information. We reserve the right to correct any errors,
					inaccuracies, or omissions and to change or update the
					information on the Services at any time, without prior
					notice.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					14. DISCLAIMER
				</Text>
				<Text>
					THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE
					BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT
					YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE
					DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION
					WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT
					LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY,
					FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE
					MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR
					COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY
					WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND
					WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1)
					ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS,
					(2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE
					WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE
					SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR
					SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION
					AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY
					INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE
					SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE
					WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY
					THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY
					CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND
					INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED,
					TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES.
					WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME
					RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR
					OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY
					HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION
					FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT
					BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING
					ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF
					PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR
					SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD
					USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE
					APPROPRIATE.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					15. LIMITATIONS OF LIABILITY
				</Text>
				<Text>
					IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS
					BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT,
					INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR
					PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS
					OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE
					SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF
					SUCH DAMAGES.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					16. INDEMNIFICATION
				</Text>
				<Text>
					You agree to defend, indemnify, and hold us harmless,
					including our subsidiaries, affiliates, and all of our
					respective officers, agents, partners, and employees, from
					and against any loss, damage, liability, claim, or demand,
					including reasonable attomeys' fees and expenses, made by
					any third party due to or arising out of: (1) your
					Contributions; (2) use of the Services; (3) breach of these
					Legal Terms; (4) any breach of your representations and
					warranties set forth in these Legal Terms; (5) your
					violation of the rights of a third party, including but not
					limited to intellectual property rights; or (6) any overt
					harmful act toward any other user of the Services with whom
					you connected via the Services. Notwithstanding the
					foregoing, we reserve the right, at your expense, to assume
					the exclusive defense and control of any matter for which
					you are required to indemnify us, and you agree to
					cooperate, at your expense, with our defense of such claims.
					We will use reasonable efforts to notify you of any such
					claim, action, or proceeding which is subject to this
					indemnification upon becoming aware of it.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					17. USER DATA
				</Text>
				<Text>
					We will maintain certain data that you transmit to the
					Services for the purpose of managing the performance of the
					Services, as well as data relating to your use of the
					Services. Although we perform regular routine backups of
					data, you are solely responsible for all data that you
					transmit or that relates to any activity you have undertaken
					using the Services. You agree that we shall have no
					liability to you for any loss or corruption of any such
					data, and you hereby waive any right of action against us
					arising from any such loss or corruption of such data.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
					textAlign={'start'}
				>
					18. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
				</Text>
				<Text>
					Visiting the Services, sending us emails, and completing
					online forms constitute electronic communications. You
					consent to receive electronic communications, and you agree
					that all agreements, notices, disclosures, and other
					communications we provide to you electronically, via email
					and on the Services, satisfy any legal requirement that such
					communication be in writing. YOU HEREBY AGREE TO THE USE OF
					ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS,
					AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS
					OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE
					SERVICES. You hereby waive any rights or requirements under
					any statutes, regulations, rules, ordinances, or other laws
					in any jurisdiction which require an original signature or
					delivery or retention of non-electronic records, or to
					payments or the granting of credits by any means other than
					electronic means.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					19. MISCELLANEOUS
				</Text>
				<Text>
					These Legal Terms and any policies or operating rules posted
					by us on the Services or in respect to the Services
					constitute the entire agreement and understanding between
					you and us. Our failure to exercise or enforce any right or
					provision of these Legal Terms shall not operate as a waiver
					of such right or provision. These Legal Terms operate to the
					fullest extent permissible by law. We may assign any or all
					of our rights and obligations to others at any time. We
					shall not be responsible or liable for any loss, damage,
					delay, or failure to act caused by any cause beyond our
					reasonable control. If any provision or part of a provision
					of these Legal Terms is determined to be unlawful, void, or
					unenforceable, that provision or part of the provision is
					deemed severable from these Legal Terms and does not affect
					the validity and enforceability of any remaining provisions.
					There is no joint venture, partnership, employment or agency
					relationship created between you and us as a result of these
					Legal Terms or use of the Services. You agree that these
					Legal Terms will not be construed against us by virtue of
					having drafted them. You hereby waive any and all defenses
					you may have based on the electronic form of these Legal
					Terms and the lack of signing by the parties hereto to
					execute these Legal Terms.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					20. CONTACT US
				</Text>
				<Text>
					In order to resolve a complaint regarding the Services or to
					receive further information regarding use of the Services,
					please contact us at:
				</Text>
				<Text as={'b'}>
					Congressional Town Center - ICODES: An Interactive Condo
					Unit System with Decision Support
				</Text>
				<Text as={'b'}>23 Bahay Toro Avenue</Text>
				<Text as={'b'}>Quezon City, National Capital Region 1105</Text>
				<Text as={'b'}>Philippines</Text>
				<Text as={'b'}>Phone: 09297560675/09915465204</Text>
				<Text as={'b'}>ctcqcicodes@gmail.com</Text>
			</Flex>
		);
	};

	return (
		<CusModalTAP
			onOpen={onOpen}
			onClose={onclose}
			isOpen={isOpen}
			body={<Child />}
			header={'TERMS AND CONDITIONS'}
		/>
	);
};

export const PrivacyAndPolicy = ({ onOpen, onclose, isOpen }) => {
	const Child = () => {
		return (
			<Flex
				flexDir={'column'}
				gap={3}
				textAlign={'justify'}
			>
				<Text
					fontSize={'2xl'}
					as={'b'}
				>
					Privacy Policy{' '}
				</Text>
				<Text> Last updated: November 25, 2023 </Text>
				<Text>
					This Privacy Policy describes Our policies and procedures on
					the collection, use and disclosure of Your information when
					You use the Service and tells You about Your privacy rights
					and how the law protects You.
				</Text>
				<Text>
					We use Your Personal data to provide and improve the
					Service. By using the Service, You agree to the collection
					and use of information in accordance with this Privacy
					Policy.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					Interpretation and Definitions
				</Text>
				<Text
					fontSize={'lg'}
					as={'b'}
				>
					Interpretation{' '}
				</Text>
				<Text>
					The words of which the initial letter is capitalized have
					meanings defined under the following conditions. The
					following definitions shall have the same meaning regardless
					of whether they appear in singular or in plural.
				</Text>
				<Text
					fontSize={'lg'}
					as={'b'}
				>
					Definitions{' '}
				</Text>
				<Text>For the purposes of this Privacy Policy: </Text>
				<UnorderedList
					pl={10}
					spacing={3}
				>
					<ListItem>
						<Text as={'b'}>Account</Text> means a unique account
						created for You to access our Service or parts of our
						Service.
					</ListItem>
					<ListItem>
						<Text as={'b'}>Affiliate</Text> means an entity that
						controls, is controlled by or is under common control
						with a party, where "control" means ownership of 50% or
						more of the shares, equity interest or other securities
						entitled to vote for election of directors or other
						managing authority.
					</ListItem>
					<ListItem>
						<Text as={'b'}>Company</Text> (referred to as either
						"the Company", "We", "Us" or "Our" in this Agreement)
						refers to Congressional Town Center, 23 Bahay Toro
						Avenue 1105, Quezon City, NCR.
					</ListItem>
					<ListItem>
						<Text as={'b'}>Cookies</Text> are small files that are
						placed on Your computer, mobile device or any other
						device by a website, containing the details of Your
						browsing history on that website among its many uses.
					</ListItem>
					<ListItem>
						<Text as={'b'}>Country</Text> refers to: Philippines
					</ListItem>
					<ListItem>
						<Text as={'b'}>Device</Text> means any device that can
						access the Service such as a computer, a cellphone or a
						digital tablet.
					</ListItem>
					<ListItem>
						<Text as={'b'}>Personal Data</Text> is any information
						that relates to an identified or identifiable
						individual.
					</ListItem>
					<ListItem>
						<Text as={'b'}>Service</Text> refers to the Website.
					</ListItem>
					<ListItem>
						<Text as={'b'}>Service Provider</Text> means any natural
						or legal person who processes the data on behalf of the
						Company. It refers to third-party companies or
						individuals employed by the Company to facilitate the
						Service, to provide the Service on behalf of the
						Company, to perform services related to the Service or
						to assist the Company in analyzing how the Service is
						used.
					</ListItem>
					<ListItem>
						<Text as={'b'}>Usage Data</Text> refers to data
						collected automatically, either generated by the use of
						the Service or from the Service infrastructure itself
						(for example, the duration of a page visit).
					</ListItem>
					<ListItem>
						<Text as={'b'}>Website</Text> refers to ICODES,
						accessible from{' '}
						<Link
							href='https://www.ctcqcicodes.com'
							color={'#2a6ac9'}
						>
							ctcqcicodes.com{' '}
						</Link>
					</ListItem>
					<ListItem>
						<Text as={'b'}>You</Text> means the individual accessing
						or using the Service, or the company, or other legal
						entity on behalf of which such individual is accessing
						or using the Service, as applicable.
					</ListItem>
				</UnorderedList>
				<Text
					fontSize={'2xl'}
					as={'b'}
				>
					Collecting and Using Your Personal Data{' '}
				</Text>
				<Text
					fontSize={'lg'}
					as={'b'}
				>
					Types of Data Collected
				</Text>
				<Text
					fontSize={'md'}
					as={'b'}
				>
					Personal Data{' '}
				</Text>
				<Text>
					While using Our Service, We may ask You to provide Us with
					certain personally identifiable information that can be used
					to contact or identify You. Personally identifiable
					information may include, but is not limited to:
				</Text>
				<UnorderedList
					pl={10}
					spacing={3}
				>
					<ListItem>Email address</ListItem>
					<ListItem>First name and last name</ListItem>
					<ListItem>Phone number</ListItem>
					<ListItem>
						Address, State, Province, ZIP/Postal code, City
					</ListItem>
					<ListItem>Usage Data</ListItem>
				</UnorderedList>
				<Text
					fontSize={'md'}
					as={'b'}
				>
					Usage Data{' '}
				</Text>
				<Text>
					Usage Data is collected automatically when using the
					Service.{' '}
				</Text>
				<Text>
					Usage Data may include information such as Your Device's
					Internet Protocol address (e.g. IP address), browser type,
					browser version, the pages of our Service that You visit,
					the time and date of Your visit, the time spent on those
					pages, unique device identifiers and other diagnostic data.
				</Text>
				<Text>
					When You access the Service by or through a mobile device,
					We may collect certain information automatically, including,
					but not limited to, the type of mobile device You use, Your
					mobile device unique ID, the IP address of Your mobile
					device, Your mobile operating system, the type of mobile
					Internet browser You use, unique device identifiers and
					other diagnostic data.
				</Text>
				<Text>
					We may also collect information that Your browser sends
					whenever You visit our Service or when You access the
					Service by or through a mobile device.
				</Text>
				<Text
					fontSize={'md'}
					as={'b'}
				>
					Tracking Technologies and Cookies{' '}
				</Text>
				<Text>
					We use Cookies and similar tracking technologies to track
					the activity on Our Service and store certain information.
					Tracking technologies used are beacons, tags, and scripts to
					collect and track information and to improve and analyze Our
					Service. The technologies We use may include:
				</Text>
				<UnorderedList
					pl={10}
					spacing={3}
				>
					<ListItem>
						<Text as={'b'}>Cookies or Browser Cookies.</Text> A
						cookie is a small file placed on Your Device. You can
						instruct Your browser to refuse all Cookies or to
						indicate when a Cookie is being sent. However, if You do
						not accept Cookies, You may not be able to use some
						parts of our Service. Unless you have adjusted Your
						browser setting so that it will refuse Cookies, our
						Service may use Cookies.
					</ListItem>
					<ListItem>
						<Text as={'b'}>Web Beacons.</Text> Certain sections of
						our Service and our emails may contain small electronic
						files known as web beacons (also referred to as clear
						gifs, pixel tags, and single-pixel gifs) that permit the
						Company, for example, to count users who have visited
						those pages or opened an email and for other related
						website statistics (for example, recording the
						popularity of a certain section and verifying system and
						server integrity).
					</ListItem>
				</UnorderedList>
				<Text>
					Cookies can be "Persistent" or "Session" Cookies. Persistent
					Cookies remain on Your personal computer or mobile device
					when You go offline, while Session Cookies are deleted as
					soon as You close Your web browser.
				</Text>
				<Text>
					We use both Session and Persistent Cookies for the purposes
					set out below:
				</Text>
				<UnorderedList
					pl={10}
					spacing={3}
				>
					<ListItem>
						<Text as={'b'}>Necessary / Essential Cookies</Text>
					</ListItem>
					<Text>Type: Session Cookies</Text>
					<Text>Administered by: Us</Text>
					<Text>
						Purpose: These Cookies are essential to provide You with
						services available through the Website and to enable You
						to use some of its features. They help to authenticate
						users and prevent fraudulent use of user accounts.
						Without these Cookies, the services that You have asked
						for cannot be provided, and We only use these Cookies to
						provide You with those services.
					</Text>
					<ListItem>
						<Text as={'b'}>
							Cookies Policy / Notice Acceptance Cookies
						</Text>
					</ListItem>
					<Text>Type: Persistent Cookies</Text>
					<Text>Administered by: Us</Text>
					<Text>
						Purpose: These Cookies allow us to remember choices You
						make when You use the Website, such as remembering your
						login details or language preference. The purpose of
						these Cookies is to provide You with a more personal
						experience and to avoid You having to re-enter your
						preferences every time You use the Website.
					</Text>
				</UnorderedList>
				<Text>
					For more information about the cookies we use and your
					choices regarding cookies, please visit our Cookies Policy
					or the Cookies section of our Privacy Policy.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					Use of Your Personal Data{' '}
				</Text>
				<Text>
					The Company may use Personal Data for the following
					purposes:
				</Text>
				<UnorderedList
					pl={10}
					spacing={3}
				>
					<ListItem>
						<Text as={'b'}>
							To provide and maintain our Service
						</Text>
						, including to monitor the usage of our Service.
					</ListItem>
					<ListItem>
						<Text as={'b'}>To manage Your Account:</Text> to manage
						Your registration as a user of the Service. The Personal
						Data You provide can give You access to different
						functionalities of the Service that are available to You
						as a registered user.
					</ListItem>
					<ListItem>
						<Text as={'b'}>For the performance of a contract:</Text>
						the development, compliance and undertaking of the
						purchase contract for the products, items or services
						You have purchased or of any other contract with Us
						through the Service.
					</ListItem>
					<ListItem>
						<Text as={'b'}>To contact You:</Text> To contact You by
						email, telephone calls, SMS, or other equivalent forms
						of electronic communication, such as a mobile
						application's push notifications regarding updates or
						informative communications related to the
						functionalities, products or contracted services,
						including the security updates, when necessary or
						reasonable for their implementation.
					</ListItem>
					<ListItem>
						<Text as={'b'}>To provide You</Text> with news, special
						offers and general information about other goods,
						services and events which we offer that are similar to
						those that you have already purchased or enquired about
						unless You have opted not to receive such information.
					</ListItem>
					<ListItem>
						<Text as={'b'}>To manage Your requests:</Text> To attend
						and manage Your requests to Us.
					</ListItem>
					<ListItem>
						<Text as={'b'}>For business transfers:</Text> We may use
						Your information to evaluate or conduct a merger,
						divestiture, restructuring, reorganization, dissolution,
						or other sale or transfer of some or all of Our assets,
						whether as a going concern or as part of bankruptcy,
						liquidation, or similar proceeding, in which Personal
						Data held by Us about our Service users is among the
						assets transferred.
					</ListItem>
					<ListItem>
						<Text as={'b'}>For other purposes:</Text> We may use
						Your information for other purposes, such as data
						analysis, identifying usage trends, determining the
						effectiveness of our promotional campaigns and to
						evaluate and improve our Service, products, services,
						marketing and your experience.
					</ListItem>
				</UnorderedList>
				<Text>
					We may share Your personal information in the following
					situations:{' '}
				</Text>
				<UnorderedList
					pl={10}
					spacing={3}
				>
					<ListItem>
						<Text as={'b'}>With Service Providers:</Text> We may
						share Your personal information with Service Providers
						to monitor and analyze the use of our Service, to
						contact You.
					</ListItem>
					<ListItem>
						<Text as={'b'}>For business transfers:</Text> We may
						share or transfer Your personal information in
						connection with, or during negotiations of, any merger,
						sale of Company assets, financing, or acquisition of all
						or a portion of Our business to another company.
					</ListItem>
					<ListItem>
						<Text as={'b'}>With Affiliates:</Text> We may share Your
						information with Our affiliates, in which case we will
						require those affiliates to honor this Privacy Policy.
						Affiliates include Our parent company and any other
						subsidiaries, joint venture partners or other companies
						that We control or that are under common control with
						Us.
					</ListItem>
					<ListItem>
						<Text as={'b'}>With business partners:</Text> We may
						share Your information with Our business partners to
						offer You certain products, services or promotions.
					</ListItem>
					<ListItem>
						<Text as={'b'}>With other users:</Text> when You share
						personal information or otherwise interact in the public
						areas with other users, such information may be viewed
						by all users and may be publicly distributed outside.
					</ListItem>
					<ListItem>
						<Text as={'b'}>With Your consent:</Text> We may disclose
						Your personal information for any other purpose with
						Your consent.
					</ListItem>
				</UnorderedList>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					Retention of Your Personal Data
				</Text>
				<Text>
					The Company will retain Your Personal Data only for as long
					as is necessary for the purposes set out in this Privacy
					Policy. We will retain and use Your Personal Data to the
					extent necessary to comply with our legal obligations (for
					example, if we are required to retain your data to comply
					with applicable laws), resolve disputes, and enforce our
					legal agreements and policies. The Company will also retain
					Usage Data for internal analysis purposes. Usage Data is
					generally retained for a shorter period of time, except when
					this data is used to strengthen the security or to improve
					the functionality of Our Service, or We are legally
					obligated to retain this data for longer time periods.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					Transfer of Your Personal Data{' '}
				</Text>
				<Text>
					Your information, including Personal Data, is processed at
					the Company's operating offices and in any other places
					where the parties involved in the processing are located. It
					means that this information may be transferred to — and
					maintained on — computers located outside of Your state,
					province, country or other governmental jurisdiction where
					the data protection laws may differ than those from Your
					jurisdiction.
				</Text>
				<Text>
					Your consent to this Privacy Policy followed by Your
					submission of such information represents Your agreement to
					that transfer.
				</Text>
				<Text>
					The Company will take all steps reasonably necessary to
					ensure that Your data is treated securely and in accordance
					with this Privacy Policy and no transfer of Your Personal
					Data will take place to an organization or a country unless
					there are adequate controls in place including the security
					of Your data and other personal information.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					Delete Your Personal Data{' '}
				</Text>
				<Text>
					You have the right to delete or request that We assist in
					deleting the Personal Data that We have collected about You.
				</Text>
				<Text>
					Our Service may give You the ability to delete certain
					information about You from within the Service.
				</Text>
				<Text>
					You may update, amend, or delete Your information at any
					time by signing in to Your Account, if you have one, and
					visiting the account settings section that allows you to
					manage Your personal information. You may also contact Us to
					request access to, correct, or delete any personal
					information that You have provided to Us.
				</Text>
				<Text>
					Please note, however, that We may need to retain certain
					information when we have a legal obligation or lawful basis
					to do so.
				</Text>
				<Text
					fontSize={'xl'}
					as={'b'}
				>
					Disclosure of Your Personal Data{' '}
				</Text>
				<Text
					fontSize={'lg'}
					as={'b'}
				>
					Business Transactions
				</Text>
				<Text>
					If the Company is involved in a merger, acquisition or asset
					sale, Your Personal Data may be transferred. We will provide
					notice before Your Personal Data is transferred and becomes
					subject to a different Privacy Policy.
				</Text>
				<Text
					fontSize={'lg'}
					as={'b'}
				>
					Law enforcement{' '}
				</Text>
				<Text>
					Under certain circumstances, the Company may be required to
					disclose Your Personal Data if required to do so by law or
					in response to valid requests by public authorities (e.g. a
					court or a government agency).
				</Text>
				<Text
					fontSize={'lg'}
					as={'b'}
				>
					Other legal requirements
				</Text>
				<Text>
					The Company may disclose Your Personal Data in the good
					faith belief that such action is necessary to:
				</Text>
				<UnorderedList
					pl={10}
					spacing={3}
				>
					<ListItem>Comply with a legal obligation</ListItem>
					<ListItem>
						Protect and defend the rights or property of the Company
					</ListItem>
					<ListItem>
						Prevent or investigate possible wrongdoing in connection
						with the Service
					</ListItem>
					<ListItem>
						Protect the personal safety of Users of the Service or
						the public
					</ListItem>
					<ListItem>Protect against legal liability</ListItem>
				</UnorderedList>
				<Text
					fontSize={'lg'}
					as={'b'}
				>
					Security of Your Personal Data{' '}
				</Text>
				<Text>
					The security of Your Personal Data is important to Us, but
					remember that no method of transmission over the Internet,
					or method of electronic storage is 100% secure. While We
					strive to use commercially acceptable means to protect Your
					Personal Data, We cannot guarantee its absolute security.
				</Text>
				<Text
					fontSize={'2xl'}
					as={'b'}
				>
					Children's Privacy
				</Text>
				<Text>
					Our Service does not address anyone under the age of 13. We
					do not knowingly collect personally identifiable information
					from anyone under the age of 13. If You are a parent or
					guardian and You are aware that Your child has provided Us
					with Personal Data, please contact Us. If We become aware
					that We have collected Personal Data from anyone under the
					age of 13 without verification of parental consent, We take
					steps to remove that information from Our servers.
				</Text>
				<Text>
					If We need to rely on consent as a legal basis for
					processing Your information and Your country requires
					consent from a parent, We may require Your parent's consent
					before We collect and use that information.
				</Text>
				<Text
					fontSize={'2xl'}
					as={'b'}
				>
					Links to Other Websites{' '}
				</Text>
				<Text>
					Our Service may contain links to other websites that are not
					operated by Us. If You click on a third party link, You will
					be directed to that third party's site. We strongly advise
					You to review the Privacy Policy of every site You visit.
				</Text>
				<Text>
					We have no control over and assume no responsibility for the
					content, privacy policies or practices of any third party
					sites or services.
				</Text>
				<Text
					fontSize={'2xl'}
					as={'b'}
				>
					Changes to this Privacy Policy{' '}
				</Text>
				<Text>
					We may update Our Privacy Policy from time to time. We will
					notify You of any changes by posting the new Privacy Policy
					on this page.
				</Text>
				<Text>
					We will let You know via email and/or a prominent notice on
					Our Service, prior to the change becoming effective and
					update the "Last updated" date at the top of this Privacy
					Policy.
				</Text>
				<Text>
					You are advised to review this Privacy Policy periodically
					for any changes. Changes to this Privacy Policy are
					effective when they are posted on this page.
				</Text>
				<Text
					fontSize={'2xl'}
					as={'b'}
				>
					Contact Us
				</Text>
				<Text>
					If you have any questions about this Privacy Policy, You can
					contact us:
				</Text>
				<UnorderedList
					pl={10}
					spacing={3}
				>
					<ListItem>By email:ctcqcicodes@gmail.com</ListItem>
				</UnorderedList>
			</Flex>
		);
	};
	return (
		<CusModalTAP
			onOpen={onOpen}
			onClose={onclose}
			isOpen={isOpen}
			body={<Child />}
			header={'Privacy Policy for ICODES'}
		/>
	);
};
