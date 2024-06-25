import { useTexture } from "@react-three/drei";

import { useGLTF } from '@react-three/drei'
import { useEffect } from "react";

export default function Test(props) {
  const { nodes, materials } = useGLTF('models/testTav.glb')
  const uvMap = useTexture('models/wall_bake.png')  
  for(const m in materials) materials[m].metalness=0

  useEffect(() => {
    console.log(materials['Parede_Superfcie_-_Fosca.001'])

  },[])

  return (
    <group {...props} dispose={null}>
      {/* <mesh geometry={nodes['Baqueta_(1)_Plastic_-_Translucent_Glossy_(Yellow)_0001'].geometry} material={materials['Plastic_-_Translucent_Glossy_Yellow.001']} position={[-22.349, 0.169, 0.743]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Baqueta_(2)_Banqueta_Carvalho_-_Semibrilhante_0001'].geometry} material={materials['Banqueta_Carvalho_-_Semibrilhante.001']} position={[-22.349, 0.169, 0.743]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Ba��_(2)_Barris_Nogueira_0001'].geometry} material={materials['Barris_Nogueira.001']} position={[-20.513, -0.695, -3.8]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes.Cartaz_1_cartaz_2_Poliestireno_0001.geometry} material={materials['cartaz_2_Poliestireno.001']} position={[-22.349, 0, 0.759]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes.Cartaz_2_cartaz_Espelho_0001.geometry} material={materials['cartaz_Espelho.001']} position={[-22.349, 0, 0.759]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Machado_(1)_Nickel_-_Polished_0001'].geometry} material={materials['Nickel_-_Polished.001']} position={[-22.349, 0, 0.743]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Machado_Nickel_-_Satin_0001'].geometry} material={materials['Nickel_-_Satin.001']} position={[-22.349, 0, 0.743]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} /> */}
      {/* <mesh geometry={nodes['Cadeira_1_Paint_-_Enamel_Glossy_(Red)_0001'].geometry} material={materials['Paint_-_Enamel_Glossy_Red.001']} position={[-18.504, -0.044, -12.086]} rotation={[-Math.PI, 0.732, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Cadeira_2_Plastic_-_Translucent_Glossy_(Blue)_0001'].geometry} material={materials['Plastic_-_Translucent_Glossy_Blue.001']} position={[-18.504, -0.044, -12.086]} rotation={[-Math.PI, 0.732, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes.Cadeira_3_Mesa_redonda_Mogno_0001.geometry} material={materials['Mesa_redonda_Mogno.001']} position={[-18.504, -0.044, -12.086]} rotation={[-Math.PI, 0.732, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes.Cadeira_4_PEEK_0001.geometry} material={materials['PEEK.001']} position={[-18.504, -0.044, -12.086]} rotation={[-Math.PI, 0.732, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Moldura_quadro_Carbon_Fiber_-_Plain_0001'].geometry} material={materials['Carbon_Fiber_-_Plain.001']} position={[-22.349, 0, 0.743]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Pano_de_prato_Fabric_(Light_Brown)_0001'].geometry} material={materials['Fabric_Light_Brown_0.001']} position={[-22.349, 0, 0.743]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Acabamento_1_Deta��hes_de_madeiraas_Cerejeira_0001'].geometry} material={materials['Detahes_de_madeiraas_Cerejeira.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={[0.009, 0.01, 0.009]} /> */}
      {/* <mesh geometry={nodes['Balc��o_(1)_Balc��o_Pintura_-_Esmalte_com_brilho_(C'].geometry} material={materials['Balco_Pintura_-_Esmalte_com_brilho_Cinza_escuro.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['chamin��_Polymide_(Kapton)_0001'].geometry} material={materials['Polymide_Kapton.001']} position={[-22.767, 0.001, 0.795]} rotation={[-Math.PI, 0, -Math.PI]} scale={[0.01, 0.009, 0.009]} />
      <mesh geometry={nodes['Detalhe_Balc��o_(1)_Bronze_-_Patina_0001'].geometry} material={materials['Bronze_-_Patina.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes.Escada_Pine_0001.geometry} material={materials['Pine.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Fogueira_Lenha_Bambu_claro_-_Semi-brilhante_0001'].geometry} material={materials['Lenha_Bambu_claro_-_Semi-brilhante.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} /> */}
      {/* <mesh geometry={nodes['Janela_(1)_Gemstone_-_Ruby_0001'].geometry} material={materials['Gemstone_-_Ruby.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} /> */}
      {/* <mesh geometry={nodes['Lareira_Lareira_Superf��cie_-_Fosca_0001'].geometry} material={materials['Lareira_Superfcie_-_Fosca.001']} position={[-22.349, 0.001, 0.755]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} /> */}
      {/* <mesh geometry={nodes['Lenha_Fabric_(Light_Brown)_0001'].geometry} material={materials['Fabric_Light_Brown.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} /> */}
      <mesh geometry={nodes['Parede_1_Parede_Superf��cie_-_Fosca_0001'].geometry} material={materials['Parede_Superfcie_-_Fosca.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Piso_Surface_-_Matte_0001'].geometry} material={materials['Surface_-_Matte.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Porta_da_Escada_(1)_Gemstone_-_Diamond_0001'].geometry} material={materials['Gemstone_-_Diamond.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Porta_da_Escada_Gemstone_-_Sapphire_0001'].geometry} material={materials['Gemstone_-_Sapphire.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Prateleiras_Estante_Pintura_-_Esmalte_com_brilho_(Verde)_0001'].geometry} material={materials['Estante_Pintura_-_Esmalte_com_brilho_Verde.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Puxador_(1)_Steel_-_Satin_0001'].geometry} material={materials['Steel_-_Satin.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Tampo_Balc��o_Paek_(Beige)_0001'].geometry} material={materials['Paek_Beige.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Vidro_(1)_Glass_(Clear)_0001'].geometry} material={materials['Glass_Clear.001']} position={[-22.349, 0.001, 0.745]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Pilar_(1)_Cherry_0001'].geometry} material={materials['Cherry.001']} position={[-22.349, 0, 0.743]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Quadro_Paper_(White)_0001'].geometry} material={materials['Paper_White.001']} position={[-22.349, 0, 0.759]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Body13_LED_(Red)_0001'].geometry} material={materials['LED_Red.001']} position={[-22.349, 0, 0.743]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Tocha_(1)_(2)_tocha_Pal��dio_-_Polido_0001'].geometry} material={materials['tocha_Paldio_-_Polido.001']} position={[-22.349, 0, 0.743]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Vela_(1)_(2)_Nylon_6-6_(White)_0001'].geometry} material={materials['Nylon_6-6_White.001']} position={[-22.349, 0, 0.743]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Cadeira_1_Stainless_Steel_-_Satin_0001'].geometry} material={materials['Stainless_Steel_-_Satin.001']} position={[3.804, -0.042, -20.621]} rotation={[0, 1.571, 0]} scale={0.009} />
      <mesh geometry={nodes['Cadeira_1_Stainless_Steel_-_Satin_0002'].geometry} material={materials['Stainless_Steel_-_Satin.001']} position={[-23.357, -0.042, -2.473]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Cadeira_2_(1)_Paint_-_Enamel_Glossy_(Red)_0001'].geometry} material={materials['Paint_-_Enamel_Glossy_Red.001']} position={[3.804, -0.042, -20.621]} rotation={[0, 1.571, 0]} scale={0.009} />
      <mesh geometry={nodes['Cadeira_2_(1)_Paint_-_Enamel_Glossy_(Red)_0002'].geometry} material={materials['Paint_-_Enamel_Glossy_Red.001']} position={[-23.357, -0.042, -2.473]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Cadeira_3_Stainless_Steel_-_Brushed_Linear_Long_0001'].geometry} material={materials['Stainless_Steel_-_Brushed_Linear_Long.001']} position={[3.804, -0.042, -20.621]} rotation={[0, 1.571, 0]} scale={0.009} />
      <mesh geometry={nodes['Cadeira_3_Stainless_Steel_-_Brushed_Linear_Long_0002'].geometry} material={materials['Stainless_Steel_-_Brushed_Linear_Long.001']} position={[-23.357, -0.042, -2.473]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
      <mesh geometry={nodes['Mesa_2_(3)_Stainless_Steel_-_Satin_0001'].geometry} material={materials['Stainless_Steel_-_Satin.001']} position={[3.804, -0.042, -20.621]} rotation={[0, 1.571, 0]} scale={0.009} />
      <mesh geometry={nodes['Mesa_2_(3)_Stainless_Steel_-_Satin_0002'].geometry} material={materials['Stainless_Steel_-_Satin.001']} position={[-23.357, -0.042, -2.473]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.009} />
    </group>
  )
}

useGLTF.preload('models/testTav.glb')