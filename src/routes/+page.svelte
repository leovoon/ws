<script lang="ts">
	import { goto } from '$app/navigation';
	import Moon from '$lib/components/Moon.svelte';
	import Sun from '$lib/components/Sun.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let phone = '';

	$: ({ version } = data);
	$: theme =
		typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';

	$: isLight = theme === 'light';
	$: isDark = theme === 'dark';
	$: isEmpty = phone === null || phone === undefined || phone === '';

	const handleToggleTheme = () => {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
	};

	const handleOnChange = () => {
		if (!isEmpty) {
			phone = phone.toString().replace(/[\s\-\.\(\)\+]|[^0-9]/g, '');
		}
		return;
	};

	const handleOnKeyDown = (e: { key: string; preventDefault: () => any }) => {
		return (e.key === '.' || e.key === '+' || e.key === '-') && e.preventDefault();
	};
</script>

<header>
	<nav>
		<ul>
			<li class="logo"><a href="/">ws.</a></li>
		</ul>
		<ul>
			{#if isDark}
				<Moon />
			{/if}
			{#if isLight}
				<Sun />
			{/if}
			<li class="themeToggle">
				<label for="switch">
					<input
						checked={isDark}
						type="checkbox"
						on:change={handleToggleTheme}
						id="switch"
						name="switch"
						role="switch"
					/>
				</label>
			</li>
		</ul>
	</nav>
</header>
<main class="container">
	<article>
		<div class="grid">
			<hgroup>
				<h2>WhatsApp this person</h2>
				<h3>Contact number you'd like to reach</h3>
			</hgroup>

			<div>
				<form
					on:submit={(e) => {
						e.preventDefault();
						goto(`https://api.whatsapp.com/send?phone=${phone}`);
					}}
				>
					<fieldset>
						<label for="phone">
							<input
								type="number"
								bind:value={phone}
								on:input={handleOnChange}
								on:keydown={handleOnKeyDown}
								pattern="[0-9]"
								min="0"
								id="phone"
								name="phone"
								placeholder="Phone no.  e.g. 60161234567"
								required
							/>
						</label>
					</fieldset>

					<button type="submit" disabled={isEmpty ? true : null} style:width="100%">
						Bring me to it</button
					>
				</form>
			</div>
		</div>
	</article>
</main>

<footer>
	<p>
		<small>ws. <sub>v{version}</sub> </small>

		by
		<a href="https://github.com/leovoon/ws">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
				><path
					d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
				/></svg
			>
		</a>
		leovoon
	</p>
</footer>

<style>
	footer > p {
		text-align: center;
	}

	.themeToggle {
		display: flex;
		column-gap: 0.3rem;
	}
</style>
