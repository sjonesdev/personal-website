<script lang="ts">
	import Link from '$lib/Link.svelte';
	import PageLink from '$lib/PageLink.svelte';
	import Section from '$lib/Section.svelte';
	import { throttleEvent } from '$lib/lib';
	import { onMount } from 'svelte';
	import SectionHeader from '$lib/SectionHeader.svelte';
	import ContentHeader from '$lib/ContentHeader.svelte';
	import ContentText from '$lib/ContentText.svelte';
	import ButtonLink from '$lib/ButtonLink.svelte';
	import ButtonContainer from '$lib/ButtonContainer.svelte';
	import MediaQuery from '$lib/MediaQuery.svelte';

	const SECTIONS = ['welcome', 'about', 'work', 'projects', 'contact'];
	let sectionElems: HTMLCollection; // assumed this order ^
	let activeSection: number;

	function discreteScroll(e: WheelEvent & { currentTarget: EventTarget & Window }) {
		e.preventDefault();
		// console.log(e);
		if (e.deltaY > 0) {
			//down
			if (activeSection < SECTIONS.length - 1) {
				activeSection++;
				console.log(`scrolling down to ${SECTIONS[activeSection]}`);
				sectionElems[activeSection]?.scrollIntoView({ behavior: 'smooth' });
			}
		} else if (e.deltaY < 0) {
			//up
			if (activeSection > 0) {
				activeSection--;
				console.log(`scrolling up to ${SECTIONS[activeSection]}`);
				sectionElems[activeSection]?.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}

	const updateActiveSec = () => {
		for (let i = 0; i < sectionElems.length; i++) {
			const sec = sectionElems[i];
			const rect = sec.getBoundingClientRect();
			if (
				rect.top >= 0 //&&
				// rect.left >= 0 &&
				// rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				// rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			) {
				activeSection = i;
				console.log(`setting active section to ${SECTIONS[i]}`);
				break;
			}
		}
	};

	function checkWidthForScroll(mediaMatch: boolean) {
		if (mediaMatch) {
			console.log('adding discrete scroll');
			window.addEventListener('wheel', discreteScrollEventHandler, { passive: false });
		} else {
			console.log('removing discrete scroll');
			window.removeEventListener('wheel', discreteScrollEventHandler);
		}
	}

	const discreteScrollEventHandler = throttleEvent(discreteScroll, 1000, true);
	// TODO - set current active section when page is refreshed
	onMount(() => {
		var discreteScrollMediaQuery = window.matchMedia('(min-width: 1100px)');
		checkWidthForScroll(discreteScrollMediaQuery.matches);
		discreteScrollMediaQuery.addEventListener('change', (e) => {
			checkWidthForScroll(e.matches);
		});
		sectionElems = document.getElementsByTagName('section');
		console.log(sectionElems);
		updateActiveSec();
	});

	function getClickForSection(idx: number) {
		return () => {
			activeSection = idx;
			console.log('scrolling to ' + SECTIONS[idx]);
		};
	}
</script>

<!-- <svelte:window on:scroll={throttle(discreteScroll, 300)} /> -->

<nav aria-label="page navigation" class="max-w-max fixed h-screen flex items-center pl-4 z-10">
	<ul>
		{#each SECTIONS as section, i}
			<li>
				<PageLink active={activeSection == i} targetId={section} onClick={getClickForSection(i)}>
					{section}
				</PageLink>
			</li>
		{/each}
	</ul>
</nav>

<img id="cloudtype2--1" src="LightCloudType2.svg" alt="" />
<img id="cloudtype2--2" src="LightCloudType2.svg" alt="" />
<img id="cloudtype2--3" src="LightCloudType2.svg" alt="" />
<img id="sun" src="Sun.svg" alt="" />
<img id="cloudtype1--1" src="LightCloudType1.svg" alt="" />
<img id="cloudtype1--2" src="LightCloudType1.svg" alt="" />
<img id="cloudtype3--1" src="LightCloudType3.svg" alt="" />

<Section id="welcome">
	<div class="flex flex-row h-full items-center">
		<div class="flex flex-col ml-8">
			<h1 class="text-right max-w-min font-display text-10xl">SAMUEL JONES</h1>
			<img class="pl-8 w-10/12" src="underline.svg" alt="" />
		</div>
		<img src="logo.svg" width="50%" alt="Samuel Jones' Logo" class="horiz-flip" />
	</div>
</Section>

<Section id="about">
	<SectionHeader>About Me</SectionHeader>
	<!-- <p class="mt-4 text-2xl"> -->
	<ContentText>
		<strong>Hi!</strong> My name is <strong>Samuel Jones</strong>, and I am a senior in Computer
		Science at Louisiana State University.
	</ContentText>
	<div class="flex flex-row mt-8">
		<div class="w-4/12 ml-8">
			<ContentHeader>Student</ContentHeader>
			<!-- <p class="text-xl"> -->
			<ContentText>
				I love learning about as many aspects of computer science as I can. To this end, I've taken
				courses and done projects in areas including web development, cybersecurity, video game
				design, computer vision, and autonomous robotics.
			</ContentText>
		</div>
		<div class="w-4/12 ml-8">
			<ContentHeader>Engineer</ContentHeader>
			<ContentText>
				Although the pure thrill of problem solving is what first attracted me to programming, over
				the past few years I have come to love visual design, which I prefer to show through my work
				than tell. I also enjoy and have some experience working in other areas of web development
				like backend.
			</ContentText>
		</div>
	</div>
</Section>

<Section id="work">
	<SectionHeader>Work Experience</SectionHeader>
	<div class="flex flex-row ml-8 mt-8">
		<div class="flex flex-col w-1/2">
			<ContentHeader>Flexport</ContentHeader>
			<ContentText>
				My most recent experience is my <strong>Full Stack Software Engineer</strong> internship at Flexport.
				There I owned a support form integration feature end-to-end, heavily refactoring the feature
				in one application and adding an implementation in another, allowing better user experience and
				reduced complexity when modifying the support form.
			</ContentText>
			<ContentText>
				This allowed me to work as a full-stack developer in a scrum team on my own project and
				general tasks, developing with technologies such as React.js, Ruby on Rails, NextJS, Flow,
				and GraphQL.
			</ContentText>
		</div>
		<!-- <div class="w-4/12 m-4 flex-shrink"> -->
		<img
			class="m-8 w-3/12 rounded-xl box-shadow"
			src="flexport.jpg"
			alt="Flexport logo"
			srcset=""
		/>
		<!-- </div> -->
	</div>
	<span
		class="absolute h-screen flex items-center pr-4 top-0 right-0"
		aria-label="click this or scroll right to see more work experience">See More</span
	>
</Section>

<Section id="projects">
	<SectionHeader>My Projects</SectionHeader>
	<div class="flex flex-row ml-8 mt-8">
		<div class="flex flex-col w-1/2">
			<ContentHeader>Google Font Box</ContentHeader>
			<ContentText>
				My most recent project is Google Font Box! Google Font Box is a simple tool to help
				developers develop font and color schemes for their next project, as users can make custom
				font schemes from Google Fonts and choose their own colors as well.
			</ContentText>
			<ContentText
				><span class="font-bold">Technologies:</span> Svelte, SvelteKit, TypeScript, Bootstrap, SCSS</ContentText
			>
			<ButtonContainer>
				<ButtonLink url="https://samjones329.github.io/google-font-box">Try it out!</ButtonLink>
				<ButtonLink url="https://github.com/samjones329/google-font-box" inverted>GitHub</ButtonLink
				>
			</ButtonContainer>
		</div>
		<img
			class="m-8 w-8/12 rounded-xl box-shadow"
			src="googlefontboxscreenshot.jpg"
			alt="Screenshot of Google Font Box"
		/>
	</div>
	<span aria-label="click this or scroll right to see more projects">See More</span>
</Section>

<Section id="contact">
	<SectionHeader>Contact Me</SectionHeader>
	<div>
		<img src="logo.svg" alt="Samuel Jones' Logo" />
		<Link
			url={'mailto:spjones329@gmail.com' +
				'?subject=' +
				'Hello from your website!' +
				'&body=' +
				'Hello Samuel,\n\n' +
				'Your message/request here...\n\n' +
				'Regards,\n' +
				'Your name here...'}
		>
			<i class="fa-regular fa-envelope" /> spjones329@gmail.com
		</Link>
	</div>
	<div>
		<form action="">
			<label for="name">Name</label>
			<input type="text" name="name" />

			<label for="senderemail">Your Email</label>
			<input type="text" name="senderemail" />

			<label for="message">Message</label>
			<input type="text" name="message" />

			<button type="submit">Send</button>
		</form>
	</div>
</Section>

<style>
	#cloudtype1--1 {
		position: absolute;
		width: 35rem;
		right: 3.5rem;
		top: 6.5rem;
	}

	#cloudtype1--2 {
		position: absolute;
		width: 35rem;
		right: -20rem;
		top: -4.25rem;
		transform: rotate(-180deg);
	}

	#cloudtype2--1 {
		position: absolute;
		width: 55rem;
		right: -17rem;
		bottom: 1rem;
	}

	#cloudtype2--2 {
		position: absolute;
		width: 50rem;
		top: -13.5rem;
		left: 5rem;
		transform: matrix(-1, 0, 0, 1, 0, 0);
	}

	#cloudtype2--3 {
		position: absolute;
		right: -22rem;
		top: -1.5rem;
		width: 50rem;
		transform: rotate(-180deg);
	}

	#cloudtype3--1 {
		position: absolute;
		width: 28rem;
		left: 0;
		bottom: 0;
	}

	#sun {
		position: absolute;
		width: 15rem;
		right: 3rem;
		top: 4rem;
	}
</style>
