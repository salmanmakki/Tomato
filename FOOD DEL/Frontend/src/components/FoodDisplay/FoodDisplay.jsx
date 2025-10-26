import { useContext, useEffect, useRef } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category, searchQuery = '' }) => {
  const { food_list } = useContext(StoreContext)

  const norm = (s) => (s || '').toString().toLowerCase().trim();
  const q = norm(searchQuery);

  // If searching, ignore category and search across all items. Otherwise, filter by category.
  const byCategory = food_list.filter(item => category === 'All' || item.category === category);
  const filtered = q
    ? food_list.filter(item =>
        norm(item.name).includes(q) || norm(item.description).includes(q)
      )
    : byCategory;

  // Scroll to first matching item only once per query
  const lastScrolledQueryRef = useRef('');
  useEffect(() => {
    if (!q || filtered.length === 0) return;
    if (lastScrolledQueryRef.current === q) return;
    lastScrolledQueryRef.current = q;
    const firstId = filtered[0]._id;
    const node = document.getElementById(`food-${firstId}`);
    if (node) node.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [q, filtered]);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      {q && filtered.length === 0 && (
        <div style={{ padding: '10px 0', color: '#49557e' }}>Item not found</div>
      )}
      <div className="food-display-list">
        {filtered.map((item, index) => (
          <div id={`food-${item._id}`} key={item._id || index}>
            <FoodItem
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FoodDisplay
