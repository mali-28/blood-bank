const Home = () =>{
    return <>
    <section id="about" className="contianer-fluid about-us">
       <div className="container">
           <div className="row session-title ">
           <h2 className="red">About Blood Doners</h2>

           </div>
            <div className="row">
                <div className="col-md-6 text">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                    <p> It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some formhumour, or randomised words which don't look even slightly believable. If you are going to use a passage. industry's standard dummy has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                    <p>Industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                </div>
                <div className="col-md-6 image">
                    <img src="/images/about.jpg" alt=""/>
                </div>
            </div>
       </div>
   </section>

   <section id="process" className="donation-care">
         <div className="container">
           <div className="row session-title">
               <h2 className="white">Donation Process</h2>
           </div>
            <div className="row">
                 <div className="col-md-3 col-sm-6 vd">
                    <div className="bkjiu">
                     <img src="/images/gallery/g1.jpg" alt=""/>
                     <h4><b>1 - </b>Registration</h4>
                     <p>Ut wisi enim ad minim veniam, quis laore nostrud exerci tation ulm hedi corper turet suscipit lobortis</p>
                     <button className="btn btn-sm bg-red">Readmore  📖</button>
                     </div>
                 </div>
                 <div className="col-md-3 col-sm-6 vd">
                    <div className="bkjiu">
                     <img src="/images/gallery/g2.jpg" alt=""/>
                        <h4><b>2 - </b>Seeing</h4>
                     <p>Ut wisi enim ad minim veniam, quis laore nostrud exerci tation ulm hedi corper turet suscipit lobortis</p>
                     <button className="btn btn-sm bg-red">Readmore  📖</button>
                     </div>
                 </div>
                 <div className="col-md-3 col-sm-6 vd">
                    <div className="bkjiu">
                     <img src="/images/gallery/g3.jpg" alt=""/>
                        <h4><b>3 - </b>Donation</h4>
                     <p>Ut wisi enim ad minim veniam, quis laore nostrud exerci tation ulm hedi corper turet suscipit lobortis</p>
                     <button className="btn btn-sm bg-red">Readmore  📖</button>
                     </div>
                 </div>
                 <div className="col-md-3 col-sm-6 vd">
                    <div className="bkjiu">
                        <img src="/images/gallery/g4.jpg" alt=""/>
                        <h4><b>4 - </b>Save Life</h4>
                         <p>Ut wisi enim ad minim veniam, quis laore nostrud exerci tation ulm hedi corper turet suscipit lobortis</p>
                         <button className="btn btn-sm bg-red">Readmore  📖</button>
                    </div> 
                 </div>
            </div>
            
             
         </div>
     </section>
    </>
}

export default Home;