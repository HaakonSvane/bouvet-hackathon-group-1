"use client";
import { useGetPokemonQuery } from "@/redux/api/pokeAPi";
import { Table, Typography } from "@mui/joy";
import Image from "next/image";

export default function Home() {

  const {data: pokemon, isFetching} = useGetPokemonQuery('bulbasaur');
  return (
    <main>
      <Typography level="h1">Hello world</Typography>
      {isFetching && <Typography level="h2">Fetching data...</Typography>}
      {pokemon && <div className="flex justify-row items-center">
        <Typography level="h4">{pokemon?.name}</Typography>
        <Image src={pokemon?.sprites.front_default} alt="bulbasaur" width={50} height={50} />
      </div>}

      <Table aria-label="basic table">
      <thead>
        <tr>
          <th style={{ width: '40%' }}>Dessert (100g serving)</th>
          <th>Calories</th>
          <th>Fat&nbsp;(g)</th>
          <th>Carbs&nbsp;(g)</th>
          <th>Protein&nbsp;(g)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Frozen yoghurt</td>
          <td>159</td>
          <td>6</td>
          <td>24</td>
          <td>4</td>
        </tr>
        <tr>
          <td>Ice cream sandwich</td>
          <td>237</td>
          <td>9</td>
          <td>37</td>
          <td>4.3</td>
        </tr>
        <tr>
          <td>Eclair</td>
          <td>262</td>
          <td>16</td>
          <td>24</td>
          <td>6</td>
        </tr>
        <tr>
          <td>Cupcake</td>
          <td>305</td>
          <td>3.7</td>
          <td>67</td>
          <td>4.3</td>
        </tr>
        <tr>
          <td>Gingerbread</td>
          <td>356</td>
          <td>16</td>
          <td>49</td>
          <td>3.9</td>
        </tr>
      </tbody>
    </Table>
    
    </main>
  )
}
