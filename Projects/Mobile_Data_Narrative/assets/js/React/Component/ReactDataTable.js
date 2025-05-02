(() => {
    const Filters = (props) => {
        let updateCrew = (clickEvent) => {
            props.updateFormState({
                Crew: clickEvent.target.value,
            });
        };

        let updateBo2Status = (clickEvent) => {
            const value = clickEvent.target.value;
            props.updateFormState({
                isBo2: value === '' ? null : value === 'true',
            });
        };

        const updateSearchTerm = (event) => {
            props.updateFormState({
                searchTerm: event.target.value.toLowerCase(),
            });
        };

        const updateMapOrder = (clickEvent) => {
            const value = clickEvent.target.value;
            const isChecked = clickEvent.target.checked;

            // Update MapOrder in the state (add or remove based on checkbox status)
            props.updateFormState((prevState) => {
                const updatedMapOrder = isChecked
                    ? [...prevState.MapOrder, value]
                    : prevState.MapOrder.filter((order) => order !== value);

                return { MapOrder: updatedMapOrder };
            });
        };

        const uniqueOrders = [...new Set(props.dataToDisplay.map((row) => row.Order))];

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-3">
                            <b>Crew?</b>
                        </div>
                        <div className="col-md-2">
                            <select onChange={updateCrew}>
                                <option value="">All</option>
                                <option>Ultimis</option>
                                <option>Primis</option>
                                <option>Victis</option>
                            </select>
                        </div>
                        <div className="col-md-3"></div>
                        <div className="col-md-2"></div>
                        <div className="col-md-1"></div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <b>Is Black Ops 2?</b>
                    </div>
                    <div className="col-md-2">
                        <select onChange={updateBo2Status}>
                            <option value="">All</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-3">
                        <b>Search:</b>
                    </div>
                    <div className="col-md-6">
                        <textarea
                            className="form-control"
                            placeholder="Enter search term..."
                            onChange={updateSearchTerm}
                        ></textarea>
                    </div>
                </div>

                {/* Map Order checkboxes */}
                <div className="row mt-3">
                    <div className="col-md-3">
                        <b>Map Order:</b>
                    </div>
                    <div className="col-md-9">
                        {uniqueOrders.map((order) => (
                            <div key={order} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    value={order}
                                    onChange={updateMapOrder}
                                />
                                <label className="form-check-label">{order}</label>
                            </div>
                        ))}
                    </div>
                </div>
                {/* New section at the bottom */}
                <div className="row mt-3">
                    <div className="col-md-3">
                        <b>Additional Info:</b>
                    </div>
                    <div className="col-md-9">
                        <p>The data presents a timeline of various maps from the Call of Duty Zombies franchise, highlighting key story events, characters, and their connections to different crews. Maps range from the early "Ultimis" crew adventures, such as "Verrückt" and "Shi no Numa," to later entries like "Victis" and "Primis," with varying narratives involving time travel, alternate dimensions, and confrontations with powerful entities like Richtofen and Sam. The inclusion of "Bo2" status helps distinguish maps associated with the second Black Ops game, while the storyline evolves through intricate events like betrayal, survival, and the quest for control over reality. The dates and map orders create a complex web of interconnected events that span different eras, each building on the others, with distinct plotlines and character arcs unfolding across multiple dimensions.</p>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    const DataTable = (props) => {
        return (
            <div id="tableContainer">
                <div className="table-responsive">
                    <table className="table caption-top">
                        <caption>Zombies Storyline</caption>
                        <thead>
                            <tr>
                                <th scope="col">Map Order</th>
                                <th scope="col">Map Name</th>
                                <th scope="col">Crew</th>
                                <th scope="col">Date</th>
                                <th scope="col">Story of why they are there</th>
                                <th scope="col">Is it Black Ops 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.dataToDisplay.length === 0 ? (
                                <tr>
                                    <td colSpan="6">No data available for the selected filters.</td>
                                </tr>
                            ) : (
                                props.dataToDisplay.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.Order}</td>
                                        <td>{row.Name}</td>
                                        <td>{row.Crew}</td>
                                        <td>{row.Date}</td>
                                        <td>{row.Story}</td>
                                        <td>{row.isBo2 ? 'Yes' : 'No'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    class ReactDataTable extends React.Component {
        constructor(props) {
            super(props);

            this.originalData = props.originalData;
            this.state = {
                Crew: '',
                isBo2: null, // Use `null` to represent "All"
                searchTerm: '', // Track the search term
                MapOrder: [], // Store selected Map Orders
            };

            this.updateFormState = this.updateFormState.bind(this);
        }

        updateFormState(specification) {
            this.setState(specification);
        }

        render() {
            let filteredData = this.originalData;

            // Filter by Crew
            if (this.state.Crew !== '') {
                filteredData = filteredData.filter((row) => row.Crew === this.state.Crew);
            }

            // Filter by Bo2
            if (this.state.isBo2 !== null) {
                filteredData = filteredData.filter((row) => row.isBo2 === this.state.isBo2);
            }

            // Filter by Map Order (using the selected orders)
            if (this.state.MapOrder.length > 0) {
                filteredData = filteredData.filter((row) => this.state.MapOrder.includes(row.Order));
            }

            // Filter by search term
            if (this.state.searchTerm !== '') {
                filteredData = filteredData.filter((row) =>
                    Object.values(row).some((value) =>
                        value.toString().toLowerCase().includes(this.state.searchTerm)
                    )
                );
            }

            return (
                <React.Fragment>
                    <Filters updateFormState={this.updateFormState} dataToDisplay={this.originalData} />
                    <hr />
                    <DataTable dataToDisplay={filteredData} />
                </React.Fragment>
            );
        }
    }


    const ZombiesData = [
        {
            "Order": "2nd",
            "Name": "Verrückt",
            "Crew": "Ultimis",
            "Date": "September 6th, 1945",
            "Story": "An insane asylum that Dempsey arrived at to extract American spy Peter McCain. Dempsey was then taken prisoner by 935.",
            "isBo2": false
        },
        {
            "Order": "3rd",
            "Name": "Shi no Numa",
            "Crew": "Ultimis",
            "Date": "October 21st, 1945",
            "Story": "A swamp in Japan that the crew, consiting of prisoners of 935, Dempsey, Nikolai, Takeo, and Richtofen, who had betrayed 935, went to retrive Richtofen's Diary. They find Peter McCain is dead here.",
            "isBo2": false
        },
        {
            "Order": "4th",
            "Name": "Der Riese",
            "Crew": "Ultimis",
            "Date": "October 28th, 1945",
            "Story": "Went to the facility to use the teleporter to go to the Moon and confront Samantha, a little girl who is in the M.P.D. on the Moon, who Richtofen knew from his past. His Diary gets lost here.",
            "isBo2": false
        },
        {
            "Order": "5th",
            "Name": "Kino Der Toten",
            "Crew": "Ultimis",
            "Date": "October 28th, 1963",
            "Story": "Due to the Wunderwaffe DG-2 overloading the teleporter in Der Riese, the crew got sent through space and time and end up at a different teleporter in an abandoned theater in Germany, Kino Der Toten. Richtofen finds out the Soviets have been using his Diary.",
            "isBo2": false
        },
        {
            "Order": "7th",
            "Name": "Ascension",
            "Crew": "Ultimis",
            "Date": "November 6th, 1963",
            "Story": "The crew takes lunar lander from Kino to go get the Diary from the Russians. Here scientists named Drs. Gersh and Yuri work to invent a black hole device. Yuri reads Richtofen's diary and causes him to hear Sams voice and tricks Gersh, trapping him in the black hole device. This also sends Yuri to the Pentagon. Richtofen recovers his diary and helps Gersh escape, which is now an ethereal orb able to travel across space and time. Richtofen learns about the two items needed to defeat Sam, the Vril Device and the Focusing Stone. Gersh opens a rift to Siberia for Ultimis.",
            "isBo2": false
        },
        {
            "Order": "8th",
            "Name": "Call of the Dead",
            "Crew": "Ultimis",
            "Date": "March 17th, 2011",
            "Story": "After using the rift, the crew is stuck in a closet while George Romero's crew films above. The film crew restores the power to the facility's teleporter and retrives the Vril Device for them. Ultimis thanks them and teleports to the Himalayas.",
            "isBo2": false
        },
        {
            "Order": "9th",
            "Name": "Shangri-La",
            "Crew": "Ultimis",
            "Date": "April 25th, 1956",
            "Story": "Explorers Brock and Gary discover a village and explore the ancient temple in hopes to find Agartha. During an eclipse, they become trapped in a time loop. Ultimis teleports there and helps the travelers escape their time loop. In return they lead Ultimis to the Focusing Stone. Now having both devices they need to defeat Sam they hop in the teleporter. Dempsey botches the teleportation by firing the 31-79 JGb215, sending them through time and space once again.",
            "isBo2": false
        },
        {
            "Order": "29th",
            "Name": "Classified",
            "Crew": "Ultimis",
            "Date": "November 5th, 1963",
            "Story": "This is the day that Dr. Yuri traps Dr. Gersh and gets sent to the pentagon. Yuri unleashes the zombies in the Pentagon before Sam sends him one day in the future. The crew uses the technology at the Pentagon to teleport to Area 51.",
            "isBo2": false
        },
        {
            "Order": "10th",
            "Name": "Moon",
            "Crew": "Ultimis",
            "Date": "October 13th, 2025",
            "Story": "Using the teleporter at Area 51, The Ultimis crew arrives at the Moon which contains the Moon Pyramid Device, inside is Sam. Richtofen uses the Vril Device and Focusing Stone to swap bodies with her, which gives him full control of the zombies and Aether. Maxis convices the rest of the crew to explode the earth to reduce Richtofen's power. The crew is left stranded on the Moon with Sam.",
            "isBo2": false
        },
        {
            "Order": "15th",
            "Name": "Nuketown",
            "Crew": "Victis",
            "Date": "October 13th, 2025",
            "Story": "In Nevada we find the first memeber of Victis, Marlton which is hiding in a bunker. Doing so he survies the rockets coming from the Moon. The zombies eyes shifted from yellow to blue showing Richtofen has control now.",
            "isBo2": true
        },
        {
            "Order": "11th",
            "Name": "Tranzit",
            "Crew": "Victis",
            "Date": "October 21st, 2035",
            "Story": "Russman and George Barklet, Broken Arrow Agents, transferred samples of Avogadro, a humanoid made of pure energy from the Elemental Shard, to the Hanford Facility. He would regain his full power there by mistake. Stuhlinger, the last survivor of ''The Flesh'' meets a now amnesiac Russman and would then, 8 days later find Misty and Marlton to form the crew Victis. Using the polarization device they force Avogadro to be consumed in Maxis' favor. Richtofen teleports Victis to their next location.",
            "isBo2": true
        },
        {
            "Order": "16th",
            "Name": "Die Rise",
            "Crew": "Victis",
            "Date": "October 22nd, 2035",
            "Story": "Teleported by Richtofen to Province 22, Shanghai, Stunlinger because of eating zombie flesh can hear Richtofen and is given conflicting objectives than the ones given by Maxis to the rest of the crew. They are resurrected if they fail by Richtofen. They channel souls of the undead to activate the pylon in Maxis' favor. Both voices go silent and Victis is left to roam the earth.",
            "isBo2": true
        },
        {
            "Order": "18th",
            "Name": "Buried",
            "Crew": "Victis",
            "Date": "December 31st, 2035",
            "Story": "Jebediah Brown a blacksmith in a mining town in the western frontier, he was contacted by the Keepers to forge the Pack A Punch machine as well as the Vril Vessel. He places his mother's corpse into the machine which causes her spirit to roam their house. The Keepers have him upgrade the Vril Vessel. Centuries before this in September 20th, 1318, The wolf kings servant Arthur is teleported and trapped in the now underground town. Upon Victis arriving the voices return and with the help from Arthur (Leroy) they activate the pylon for Maxis and gives him control over reality itself. He traps Richtofen's soul into a zombie and removes Sam and puts her in the Aether. He then destroys Earth but Victis escapes through a rift. Primis Richtofen has them retrive half of the Elemental Shard, have blood samples taken from them, and retreive the kronorium from the Empty Earth dimension.",
            "isBo2": true
        },
        {
            "Order": "19th",
            "Name": "Origins",
            "Crew": "Primis",
            "Date": "June 4th, 1918 (Dimension 63)",
            "Story": "After realizing that her father is corrupted Sam reaches out to alternate Dimension Maxis for help. Richtofen is visited by another version of himself. Handing him blood vials, before stepping back through the rift. Here in the midst of the Great War, Dempsey, Nikolai, and Takeo are deployed by their respective nations to track down Richtofen. They encounter him together, and before they can go any further they are attacked by Zombies. They are guided by Sam to free her from Agartha. Doctor Monty purifies Sam and gives Maxis a physical form. Monty wants to solve the multiverse problem, but needs the souls of the survived fracturing multiverse. He wipes Maxis' corruption. Sam sends Primis to their next destination.",
            "isBo2": true
        },
        {
            "Order": "17th",
            "Name": "Mob of the Dead",
            "Crew": "Primis",
            "Date": "December 31st, 1933 (Purgatory, Dimension 63)",
            "Story": "On Alcatraz island a group of 4 prisoners try to escape. They are caught in an infinite cycle of dying. Richtofen before they are trapped in the cycle collect blood samples of Sal and Finn. Richtofen arrives in Dimension 63 and orders a laboratory to be built underneath the prison. He returns to the lab where Victis is waiting with the kronorium. He finds out about the blood vials and enters a rift to acquire the blood of Sal and Finn. He then delivers said blood to the younger verison of himself. Victis is frozen until they are needed. Primis arrives to collect the Victis blood samples. Richtofen then learns about the location of the summoning key.",
            "isBo2": true
        },
        {
            "Order": "20th",
            "Name": "Shadows of Evil",
            "Crew": "Primis",
            "Date": "April 25th, 1944 (Dimension 63)",
            "Story": "4 sinners attempt to resolve their crimes with the aid of a the Shadowman. In doing so they unleash an interdimensional evil that seeks to end their world. They trap the Shadowman in the summoning key but before they can give it to the Keepers, Primis Richtofen arrives and steals the key. He then travels to Dimension 2210 to secure an innocent Richtofen soul. He delivers the soul to the House. The Apthicons destory Dimension 63.",
            "isBo2": false
        },
        {
            "Order": "21th",
            "Name": "The Giant",
            "Crew": "Primis",
            "Date": "October 13th, 1945 (Deceptio Fracture)",
            "Story": "After arriving at The Giant, Dempsey, Takeo, and Nikolai confront Ultimis Richtofen moments after he teleports Maxis and Sam (Maxis to the Crazy Place and Sam to the Moon). Richtofen kills his Ultimis self to cause dimensional fractures. As they are fightning the undead Group 935 secures Ultimis Dempsey and transports him to Der Eisendrache. Primis pursues in a German Giant.",
            "isBo2": false
        },
        {
            "Order": "22th",
            "Name": "Der Eisendrache",
            "Crew": "Primis",
            "Date": "November 5th, 1945 (Deceptio Fracture)",
            "Story": "They make it to the castle and recover the Dempsey test subject from a rocket bound for the Moon. Richtofen secures the test subjects soul and reveals to primus his intention to set things right. They destroy the castle and the Moon.",
            "isBo2": false
        },
        {
            "Order": "23rd",
            "Name": "Zetsubou No Shima",
            "Crew": "Primis",
            "Date": "October 18th, 1945 (Proditione Fracture)",
            "Story": "Primis heads to the island on Japan to retrieve Takeo's soul. Richtofen takes the crew to Dimension 63 to collect ''their blood''. This is their insurance policy, they return to the island before traveling to their next destination.",
            "isBo2": false
        },
        {
            "Order": "24th",
            "Name": "Gorod krovi",
            "Crew": "Primis",
            "Date": "November 6th, 1945 (Agonia Fracture)",
            "Story": "Peter Mccain makes his jump into Shi No Numa as a temporal rift opens below him and teleports him to Gorod Krovi with Primis. In this Dimension World War 2 continues indefinitely. Primis frees Sophia and acquire Nikolais soul. Richtofen sends all the soul up to Maxis. They also head up to Maxis. Monty announces his existence to primis for the first time.",
            "isBo2": false
        },
        {
            "Order": "25th",
            "Name": "Revelations",
            "Crew": "Primis",
            "Date": "Sometime after ''The Arrival of Primis'' (Agartha)",
            "Story": " As each of the souls arrive in The House, Monty transforms each member of Ultimis into their younger self as a means to restore their innocence. Maxis is seduced by the Shadowman to release him from the summoning key. The Apothicons now take over Agartha. Primis Richtofen and Maxis destroy the teleporter to prevent any further corruption of the universe. Primis fights alongside Monty to banish the Apothicons and defeat the Shadowman once and for all. This causes the Cycle to continue. But because Primis has the blood of closed off Dimension it causes them to stay even though they arent from that Dimension. This causes Monty to be angry at their self-preservation and sends them back to the Great War, causing the cycle to continue.",
            "isBo2": false
        },
    ];


    const container = document.getElementById('react-data-table');
    const root = ReactDOM.createRoot(container);
    root.render(<ReactDataTable originalData={ZombiesData} />);


})();