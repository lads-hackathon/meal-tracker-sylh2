import { createSignal } from 'solid-js';
import SearchBar from '../../components/SearchBar';

export default function Home() {
	return (
		<>
			<SearchBar callback={ info => alert(info.name) } />
		</>
	);
}
