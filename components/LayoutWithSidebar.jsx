import React from 'react';

export default function LayoutWithSidebar() {
    return (
        <>
            <div class='with-sidebar container'>
                <aside class='sidebar'>
                    <div class='sidebar__inner box'>
                        <h2 class='tac'>Содержание</h2>
                        <ol class='stack box'>
                            <li>один</li>
                            <li>два</li>
                            <li>три</li>
                            <li>четыре</li>
                            <li>пять</li>
                        </ol>
                    </div>
                </aside>
                <div class='stack center'>
                    <div class='box'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Exercitationem, esse nemo! Sequi dicta facilis ea
                        quae eaque blanditiis praesentium, dolorem labore id,
                        eos nisi temporibus porro atque recusandae minus
                        voluptate!
                    </div>
                    <div class='box'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Exercitationem, esse nemo! Sequi dicta facilis ea
                        quae eaque blanditiis praesentium, dolorem labore id,
                        eos nisi temporibus porro atque recusandae minus
                        voluptate!
                    </div>
                    <div class='box'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Exercitationem, esse nemo! Sequi dicta facilis ea
                        quae eaque blanditiis praesentium, dolorem labore id,
                        eos nisi temporibus porro atque recusandae minus
                        voluptate! Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Ratione molestias impedit, in optio
                        maxime quibusdam laborum placeat, tempore explicabo, at
                        eum! Quos aut in blanditiis reiciendis, praesentium
                        exercitationem minima commodi a corporis et accusantium
                        doloremque vel tempore illum rem, porro dolorem rerum,
                        quae consequatur earum veritatis quis vero velit.
                        Laboriosam.
                    </div>
                    <div class='el box'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Exercitationem, esse nemo! Sequi dicta facilis ea
                        quae eaque blanditiis praesentium, dolorem labore id,
                        eos nisi temporibus porro atque recusandae minus
                        voluptate! Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Ratione molestias impedit, in optio
                        maxime quibusdam laborum placeat, tempore explicabo, at
                        eum! Quos aut in blanditiis reiciendis, praesentium
                        exercitationem minima commodi a corporis et accusantium
                        doloremque vel tempore illum rem, porro dolorem rerum,
                        quae consequatur earum veritatis quis vero velit.
                        Laboriosam.
                    </div>
                </div>
            </div>
        </>
    );
}
