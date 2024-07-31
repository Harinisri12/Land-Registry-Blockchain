<script lang="ts">
    import { onMount } from 'svelte';
    import { emailStore } from '$lib/stores';
    let email = '';

    emailStore.subscribe(value => {
        email = value;
    });

    let propertyId = '';
    let bidAmount = '';
    let message = '';

    onMount(() => {
      // Extract propertyId from the URL query
      const urlParams = new URLSearchParams(window.location.search);
      propertyId = urlParams.get('propertyId') || '';
    });

    async function handleBid() {
      if (!bidAmount || isNaN(Number(bidAmount)) || Number(bidAmount) <= 0) {
        message = 'Please enter a valid bid amount.';
        return;
      }

      try {
        const response = await fetch('?/submitBid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bidAmount, propertyId }),
        });

        const result = await response.json();

        if (response.ok) {
          message = `Bid placed successfully , bid ID is : ${result.bidId}`;
        } else {
          message = result.message || 'Failed to place bid.';
        }
      } catch (error) {
        console.error(error);
        message = 'Failed to place bid.';
      }
    }
</script>

<style>
  /* header {
    background-color:  #999;
    color: white;
    padding: 15px;
    text-align: center;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  } */

  .container {
    max-width: 600px;
    margin: 100px auto; /* Adjusted to account for fixed header */
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .container:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    color: #333;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  input:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
  }

  .button-container {
    text-align: center;
  }

  button {
    padding: 12px 24px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  .message {
    margin-top: 20px;
    color: red;
    text-align: center;
  }
</style>

<nav class="navbar">
    <div class="navbar-content">
      <ul class="navbar-menu">
        <li class="top-left"><p>Place a Bid</p></li>
        <li class="top-right">
          <a href='/dashboard?email={email}' class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-400 md:p-0" aria-current="page">Go to dashboard</a>
        </li>
      </ul>
    </div>
  </nav>
<div class="container">
  {#if message}
    <p class="message">{message}</p>
  {/if}

  <h1>Bid for Property {propertyId}</h1>
  <form on:submit|preventDefault={handleBid}>
    <div class="form-group">
      <label for="bidAmount">Bid Amount:</label>
      <input type="number" id="bidAmount" bind:value={bidAmount} placeholder="Enter your bid amount" />
    </div>
    <div class="button-container">
      <button type="submit">Submit Bid</button>
    </div>
  </form>
</div>
