import { useGLTF } from '@react-three/drei'

export default function Tavern(props) {
  const { nodes, materials } = useGLTF('models/tavern.glb')
  
  Object.values(materials).forEach((m) => {m.metalness=0; m.side=0})
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes['Baqueta_(1)_Plastic_-_Translucent_Glossy_(Yellow)_0001'].geometry} material={materials['Plastic_-_Translucent_Glossy_Yellow.001']} position={[0.205, 0.372, 1.13]} rotation={[-Math.PI, 0, -Math.PI]} scale={1.182} />
      <mesh geometry={nodes['Baqueta_(2)_Banqueta_Carvalho_-_Semibrilhante_0001'].geometry} material={materials['Banqueta_Carvalho_-_Semibrilhante.001']} position={[0.15, 0.372, 0.207]} rotation={[-Math.PI, 0, -Math.PI]} scale={1.089} />
      {/* <mesh receiveShadow geometry={nodes['Aro_de_metal_(1)_(2)_Coating_-_Black_Oxide_0001'].geometry} material={materials['Coating_-_Black_Oxide.001']} position={[1.219, 0.302, 4.445]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.244} /> */}
      <mesh geometry={nodes['Ba��_(2)_Barris_Nogueira_0001'].geometry} material={materials['Barris_Nogueira.001']} position={[1.219, 0.292, 4.445]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.292} />
      <mesh geometry={nodes.Cartaz_1_cartaz_2_Poliestireno_0001.geometry} material={materials['cartaz_2_Poliestireno.001']} position={[-0.414, 1.558, -2.8]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.166} />
      <mesh geometry={nodes.Cartaz_2_cartaz_Espelho_0001.geometry} material={materials['cartaz_Espelho.001']} position={[-0.156, 1.46, -2.8]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.166} />
      <mesh geometry={nodes['Machado_(1)_Nickel_-_Polished_0001'].geometry} material={materials['Nickel_-_Polished.001']} position={[-3.008, 0.57, -2.692]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.531} />
      <mesh geometry={nodes['Machado_Nickel_-_Satin_0001'].geometry} material={materials['Nickel_-_Satin.001']} position={[-3.13, 0.183, -2.636]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.185} />
      <mesh geometry={nodes['Cadeira_1_Paint_-_Enamel_Glossy_(Red)_0001'].geometry} material={materials['Paint_-_Enamel_Glossy_Red.001']} position={[-1.178, 0.458, 1.768]} rotation={[-Math.PI, 0.732, -Math.PI]} scale={2.048} />
      <mesh geometry={nodes['Cadeira_2_Plastic_-_Translucent_Glossy_(Blue)_0001'].geometry} material={materials['Plastic_-_Translucent_Glossy_Blue.001']} position={[-1.473, 0.457, -1.34]} rotation={[-Math.PI, 0.732, -Math.PI]} scale={0.456} />
      <mesh geometry={nodes.Cadeira_3_Mesa_redonda_Mogno_0001.geometry} material={materials['Mesa_redonda_Mogno.001']} position={[-2.506, 0.498, -0.88]} rotation={[-Math.PI, 0.732, -Math.PI]} scale={1.024} />
      <mesh geometry={nodes.Cadeira_4_PEEK_0001.geometry} material={materials['PEEK.001']} position={[-2.922, 0.457, 0.065]} rotation={[-Math.PI, 0.732, -Math.PI]} scale={0.456} />
      {/* <mesh geometry={nodes['Moldura_quadro_Carbon_Fiber_-_Plain_0001'].geometry} material={materials['Carbon_Fiber_-_Plain.001']} position={[-0.294, 1.955, -2.815]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.233} /> */}
      <mesh geometry={nodes['Pano_de_prato_Fabric_(Light_Brown)_0001'].geometry} material={materials['Fabric_Light_Brown_0.001']} position={[0.987, 0.887, -0.751]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.242} />
      <mesh geometry={nodes['Acabamento_1_Deta��hes_de_madeiraas_Cerejeira_0001'].geometry} material={materials['Detahes_de_madeiraas_Cerejeira.001']} position={[-0.491, 1.738, 0.828]} rotation={[-Math.PI, 0, -Math.PI]} scale={[3.817, 3.856, 3.817]} />
      <mesh receiveShadow geometry={nodes['Balc��o_(1)_Balc��o_Pintura_-_Esmalte_com_brilho_(C'].geometry} material={materials['Balco_Pintura_-_Esmalte_com_brilho_Cinza_escuro.001']} position={[1.393, 0.456, 0.847]} rotation={[-Math.PI, 0, -Math.PI]} scale={2.326} />
      {/* <mesh receiveShadow geometry={nodes['chamin��_Polymide_(Kapton)_0001'].geometry} material={materials['Polymide_Kapton.001']} position={[-1.355, 2.197, -2.838]} rotation={[-Math.PI, 0, -Math.PI]} scale={[1.271, 1.246, 1.245]} /> */}
      <mesh receiveShadow geometry={nodes['Detalhe_Balc��o_(1)_Bronze_-_Patina_0001'].geometry} material={materials['Bronze_-_Patina.001']} position={[1.382, 0.456, 0.857]} rotation={[-Math.PI, 0, -Math.PI]} scale={2.336} />
      <mesh receiveShadow geometry={nodes.Escada_Pine_0001.geometry} material={materials['Pine.001']} position={[1.078, 0.851, -2.154]} rotation={[-Math.PI, 0, -Math.PI]} scale={1.043} />
      <mesh geometry={nodes['Fogueira_Lenha_Bambu_claro_-_Semi-brilhante_0001'].geometry} material={materials['Lenha_Bambu_claro_-_Semi-brilhante.001']} position={[-1.347, 0.158, -2.827]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.428} />
      {/* <mesh receiveShadow geometry={nodes['Iterno_da_lareira_PA_11_-_Nylon-_HP_11-30_(with_EOS_P_396_3'].geometry} material={materials['PA_11_-_Nylon-_HP_11-30_with_EOS_P_396_3D_Printer.001']} position={[-1.358, 0.534, -2.719]} rotation={[-Math.PI, 0, -Math.PI]} scale={[0.423, 0.414, 0.419]} /> */}
      <mesh geometry={nodes['Janela_(1)_Gemstone_-_Ruby_0001'].geometry} material={materials['Gemstone_-_Ruby.001']} position={[-0.987, 1.811, -2.89]} rotation={[-Math.PI, 0, -Math.PI]} scale={1.734} />
      <mesh receiveShadow geometry={nodes['Lareira_Lareira_Superf��cie_-_Fosca_0001'].geometry} material={materials['Lareira_Superfcie_-_Fosca.001']} position={[-1.357, 1.722, -2.637]} rotation={[-Math.PI, 0, -Math.PI]} scale={[1.721, 1.721, 1.704]} />
      <mesh receiveShadow geometry={nodes['Lenha_Fabric_(Light_Brown)_0001'].geometry} material={materials['Fabric_Light_Brown.001']} position={[-2.609, 0.209, -2.44]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.241} />
      <mesh castShadow receiveShadow geometry={nodes['Parede_1_Parede_Superf��cie_-_Fosca_0001'].geometry} material={materials['Parede_Superfcie_-_Fosca.001']} position={[-0.491, 1.722, 0.979]} rotation={[-Math.PI, 0, -Math.PI]} scale={3.941} />
      <mesh geometry={nodes['Piso_Surface_-_Matte_0001'].geometry} material={materials['Surface_-_Matte.001']} position={[-0.491, -0.201, 0.979]} rotation={[-Math.PI, 0, -Math.PI]} scale={3.941} />
      <mesh geometry={nodes['Porta_da_Escada_(1)_Gemstone_-_Diamond_0001'].geometry} material={materials['Gemstone_-_Diamond.001']} position={[2.192, 1.377, 0.932]} rotation={[-Math.PI, 0, -Math.PI]} scale={3.371} />
      <mesh geometry={nodes['Porta_da_Escada_Gemstone_-_Sapphire_0001'].geometry} material={materials['Gemstone_-_Sapphire.001']} position={[2.156, 1.363, 0.932]} rotation={[-Math.PI, 0, -Math.PI]} scale={3.333} />
      <mesh castShadow geometry={nodes['Prateleiras_Estante_Pintura_-_Esmalte_com_brilho_(Verde)_0001'].geometry} material={materials['Estante_Pintura_-_Esmalte_com_brilho_Verde.001']} position={[2.254, 1.215, 0.979]} rotation={[-Math.PI, 0, -Math.PI]} scale={1.861} />
      <mesh geometry={nodes['Puxador_(1)_Steel_-_Satin_0001'].geometry} material={materials['Steel_-_Satin.001']} position={[2.123, 1.482, 0.64]} rotation={[-Math.PI, 0, -Math.PI]} scale={3.019} />
      <mesh receiveShadow geometry={nodes['Tampo_Balc��o_Paek_(Beige)_0001'].geometry} material={materials['Paek_Beige.001']} position={[1.345, 0.926, 0.895]} rotation={[-Math.PI, 0, -Math.PI]} scale={2.374} />
      <mesh geometry={nodes['Vidro_(1)_Glass_(Clear)_0001'].geometry} material={materials['Glass_Clear.001']} position={[-0.987, 1.811, -2.891]} rotation={[-Math.PI, 0, -Math.PI]} scale={1.687} />
      <mesh geometry={nodes['Pilar_(1)_Cherry_0001'].geometry} material={materials['Cherry.001']} position={[-0.729, 1.216, 0.977]} rotation={[-Math.PI, 0, -Math.PI]} scale={4.036} />
      <mesh geometry={nodes['Quadro_Paper_(White)_0001'].geometry} material={materials['Paper_White.001']} position={[-0.294, 1.955, -2.801]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.233} />
      <mesh geometry={nodes['Tocha_(1)_(2)_tocha_Pal��dio_-_Polido_0001'].geometry} material={materials['tocha_Paldio_-_Polido.001']} position={[0.491, 1.835, 0.207]} rotation={[-Math.PI, 0, -Math.PI]} scale={3.029} />
      <mesh receiveShadow geometry={nodes['Cadeira_1_Stainless_Steel_-_Satin_0001'].geometry} material={materials['Stainless_Steel_-_Satin.001']} position={[-1.45, 0.46, 3.159]} rotation={[0, Math.PI / 2, 0]} scale={1.98} />
      <mesh geometry={nodes['Cadeira_3_Stainless_Steel_-_Brushed_Linear_Long_0001'].geometry} material={materials['Stainless_Steel_-_Brushed_Linear_Long.001']} position={[-2.014, 0.499, 2.738]} rotation={[0, Math.PI / 2, 0]} scale={1.638} />
    </group>
  )
}

useGLTF.preload('models/tavern.glb')
