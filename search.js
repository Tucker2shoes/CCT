import { createClient } from 'https://esm.sh/@supabase/supabase-js';

const SUPABASE_URL = "https://dkkrandimfexcdxswxhb.supabase.co";
const SUPABASE_KEY = "sb_publishable_UoE1g1VOF8eHyzCgakXDSg_WzhbTVU5";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function searchClaims(name) {
  const { data, error } = await supabase
    .from('claims')
    .select('*')
    .ilike('name', `%${name}%`);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

// Attach to your search form
document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("searchInput").value.trim();
  const results = await searchClaims(name);

  if (results.length === 0) {
    window.location.href = "/no-results.html";
  } else {
    localStorage.setItem("searchResults", JSON.stringify(results));
    window.location.href = "/search-results.html";
  }
});
