import { json, error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xkrknllhmcwyhtbbnnvp.supabase.co';
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Key are required');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST({ request }) {
    try {
        const { bidAmount, propertyId } = await request.json();

        if (!bidAmount || isNaN(Number(bidAmount)) || Number(bidAmount) <= 0) {
            return json({ message: 'Please enter a valid bid amount.' }, { status: 400 });
        }

        const { data, error: dbError } = await supabase
            .from('bids')
            .insert([{
                propertyId: propertyId,
                bid_amount: Number(bidAmount),
                status: 'open for auction'
            }])
            .select('*')
            .single();

        if (dbError) {
            return json({ message: 'Failed to store bid details' }, { status: 500 });
        }

        const bidId = data.id;

        return json({ bidId, message: 'Bid placed successfully' }, { status: 200 });
    } catch (err) {
        console.error(err);
        return json({ message: 'Failed to place bid' }, { status: 500 });
    }
}
