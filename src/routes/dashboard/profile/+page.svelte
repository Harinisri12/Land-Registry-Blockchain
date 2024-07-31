<script lang="ts">
 import { page } from '$app/stores';
    import { onMount } from 'svelte';

  // Supabase client setup
  import { createClient } from '@supabase/supabase-js';
    // import { error } from '@sveltejs/kit';
const supabaseUrl = 'https://xkrknllhmcwyhtbbnnvp.supabase.co';
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Key are required');
}

const supabase = createClient(supabaseUrl, supabaseKey);
console.log('supabase connected');

   let email: string | null = null;
  let userUID: string | null = null;

  // Extract email from query parameters
  $: {
    const query = new URLSearchParams($page.url.search);
    email = query.get('email');
  }


  onMount(async () => {
    // Get the current user
    // const { data: { user }, error } = await supabase.auth.getUser();

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    // console.log(sessionData);
    if (sessionError) {
      console.error('Error fetching current user:', sessionError);
    } else if (sessionData) {

        console.log(sessionData);
    //   userUID = user.id;
    //   console.log('Current User UID:', userUID);
    } else {
      console.log('No user is authenticated');
    }

  });
  // console.log(email);
  //  const dashboardUrl = email ? `/dashboard?email=${encodeURIComponent(email)}` : '/dashboard';
  //  console.log(dashboardUrl);

</script>

<nav class="navbar">
    <div class="navbar-content">
      <ul class="navbar-menu">
        <li><p>Profile</p></li>
        <li class="top-right">
          <a href='/dashboard?email={email}' class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-400 md:p-0" aria-current="page">Go to dashboard</a>
        </li>
      </ul>
    </div>
  </nav>

<style>
  /* General Styles */
 /* body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f9;
    color: #333;
  } */

  h1 {
    font-size: 32px;
    color: #2c3e50; /* Dark blue */
    margin-bottom: 10px;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  .profile-header {
    border-bottom: 2px solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  .profile-header h1 {
    margin: 0;
    font-size: 28px;
    color: #007bff; /* Bright blue */
  }

  .profile-content {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    border-left: 5px solid #007bff; /* Blue accent */
  }

  .profile-content p {
    font-size: 18px;
    margin: 10px 0;
    color: #555;
  }

  /* .footer-container {
    position: relative;
    margin-top: 20px;
  } */

  /* .footer-image {
    width: 100%;
    height: auto;
    display: block;
    margin-top: 20px;
  } */

    .top-right {
      color: rgb(46, 129, 217);
     position: absolute;
     top: 0;
     right: 0;}
  
</style>

<div class="container">
  <div class="profile-header">
    <h1>Profile </h1>
  </div>
  <div class="profile-content">
    {#if email}
      <p><strong>Email:</strong> {email}</p>
      <!-- {#if userUID}
        <p><strong>User UID:</strong> {userUID}</p>
      {:else}
        <p>User UID not found</p>
      {/if} -->
    {:else}
      <p> No email provided</p>
    {/if}
  </div>
</div>