import React, { useState, useRef } from 'react';
import { Bus, Download, Edit, ArrowRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import { Button } from '../ui/button';

const Playground = () => {
    const ticketRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [ticketData, setTicketData] = useState({
        passengerName: 'Jane Smith',
        date: '20 JUL 2024',
        from: 'Boston',
        to: 'New York',
        departureTime: '08:30 AM',
        arrivalTime: '01:30 PM',
        busNo: 'SR205',
        seat: '14B',
        platform: '3'
    });

    const handleDownload = async () => {
        if (ticketRef.current) {
            try {
                const canvas = await html2canvas(ticketRef.current);
                const image = canvas.toDataURL("image/png");
                const link = document.createElement('a');
                link.href = image;
                link.download = 'bus-ticket.png';
                link.click();
            } catch (error) {
                console.error("Error generating image:", error);
            }
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setTicketData({ ...ticketData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            {
                !isEditing ? (
                    <div className="max-w-md mx-auto my-8 font-sans" >
                        <div ref={ticketRef} className="bg-white border-2 border-black rounded-lg p-6 shadow-lg">
                            <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-4">
                                <div className="flex items-center">
                                    <Bus className="w-10 h-10 text-red-600 mr-3" />
                                    <div>
                                        <h1 className="text-2xl font-bold text-black">SwiftRide Express</h1>
                                        <p className="text-xs text-red-600">Fast. Reliable. Comfortable.</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-600">Ticket No.</p>
                                    <p className="text-sm font-semibold text-black">SR987654</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-4">
                                <div>
                                    <p className="text-xs text-gray-600">Passenger</p>
                                    <p className="text-sm font-semibold text-black">{ticketData.passengerName}</p>
                                </div>
                                <div className='ml-auto'>
                                    <p className="text-xs text-gray-600">Date</p>
                                    <p className="text-sm font-semibold text-black">{ticketData.date}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-4 bg-gray-100 p-3 rounded border border-black">
                                <div className='mr-auto ml-2'>
                                    <p className="text-xs text-gray-600">From</p>
                                    <p className="text-lg font-bold text-black">{ticketData.from}</p>
                                    <p className="text-sm text-red-600">{ticketData.departureTime}</p>
                                </div>
                                <ArrowRight className='text-red-600 w-10 h-10 self-center' />

                                <div className='ml-auto mr-2'>
                                    <p className="text-xs text-gray-600">To</p>
                                    <p className="text-lg font-bold text-black">{ticketData.to}</p>
                                    <p className="text-sm text-red-600">{ticketData.arrivalTime}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 text-center">
                                {['busNo', 'seat', 'platform'].map((field) => (
                                    <div key={field} className="bg-gray-100 p-2 rounded border border-black">
                                        <p className="text-xs text-gray-600">{field.charAt(0).toUpperCase() + field.slice(1)}</p>
                                        <p className="text-sm font-semibold text-black">{ticketData[field]}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t-2 border-black text-center">
                                <p className="text-xs text-gray-600">Please arrive 15 minutes before departure. Thank you for choosing SwiftRide Express!</p>
                            </div>

                            <div className="mt-3 flex justify-center">
                                <div className="bg-gray-100 px-4 py-1 rounded border border-black">
                                    <p className="text-xs font-mono text-black">||||| |||| |||| ||||| ||||</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-center space-x-4">
                            <Button
                                onClick={handleEdit}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 flex items-center transition duration-300 rounded-md"
                            >
                                <Edit className="w-5 h-5 mr-2" />
                                Edit Ticket
                            </Button>
                            <Button
                                onClick={handleDownload}
                                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 flex items-center transition duration-300 rounded-md"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Download Ticket
                            </Button>
                        </div>
                    </div >
                ) : (
                    <div className="max-w-md mx-auto my-8 font-sans">
                        <div className="bg-white border-2 border-black rounded-lg p-6 shadow-lg">
                            <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-4">
                                <div className="flex items-center">
                                    <Bus className="w-10 h-10 text-red-600 mr-3" />
                                    <div>
                                        <h1 className="text-2xl font-bold text-black">SwiftRide Express</h1>
                                        <p className="text-xs text-red-600">Fast. Reliable. Comfortable.</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-600">Ticket No.</p>
                                    <p className="text-sm font-semibold text-black">SR987654</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-4">
                                <div>
                                    <p className="text-xs text-gray-600">Passenger</p>
                                    <input
                                        maxLength={18}
                                        type="text"
                                        name="passengerName"
                                        value={ticketData.passengerName}
                                        onChange={handleChange}
                                        className="text-sm font-semibold text-black border-b border-gray-300 focus:outline-none focus:border-red-600 max-w-[9rem] text-center"
                                    />
                                </div>
                                <div className='ml-auto'>
                                    <p className="text-xs text-gray-600">Date</p>
                                    <input
                                        maxLength={18}
                                        type="text"
                                        name="date"
                                        value={ticketData.date}
                                        onChange={handleChange}
                                        className="text-sm font-semibold text-black border-b border-gray-300 focus:outline-none focus:border-red-600 max-w-[9rem] text-center"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-4 bg-gray-100 p-3 rounded border border-black">
                                <div className='mr-auto ml-2'>
                                    <p className="text-xs text-gray-600">From</p>
                                    <input
                                        maxLength={10}
                                        type="text"
                                        name="from"
                                        value={ticketData.from}
                                        onChange={handleChange}
                                        className="text-lg font-bold text-black bg-transparent border-b border-gray-300 focus:outline-none focus:border-red-600 max-w-[9rem] text-center"
                                    />
                                    <input
                                        maxLength={10}
                                        type="text"
                                        name="departureTime"
                                        value={ticketData.departureTime}
                                        onChange={handleChange}
                                        className="text-sm text-red-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-red-600 max-w-[9rem] text-center"
                                    />
                                </div>
                                <ArrowRight className='w-10 h-10 ml-auto mr-auto text-gray-100' />

                                <div className='ml-auto mr-2'>
                                    <p className="text-xs text-gray-600">To</p>
                                    <input
                                        maxLength={10}
                                        type="text"
                                        name="to"
                                        value={ticketData.to}
                                        onChange={handleChange}
                                        className="text-lg font-bold text-black bg-transparent border-b border-gray-300 focus:outline-none focus:border-red-600 max-w-[9rem] text-center"
                                    />
                                    <input
                                        maxLength={10}
                                        type="text"
                                        name="arrivalTime"
                                        value={ticketData.arrivalTime}
                                        onChange={handleChange}
                                        className="text-sm text-red-600 bg-transparent border-b border-gray-300 focus:outline-none focus:border-red-600 max-w-[9rem] text-center"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 text-center">
                                {['busNo', 'seat', 'platform'].map((field) => (
                                    <div key={field} className="bg-gray-100 p-2 rounded border border-black">
                                        <p className="text-xs text-gray-600">{field.charAt(0).toUpperCase() + field.slice(1)}</p>
                                        <input
                                            maxLength={10}
                                            type="text"
                                            name={field}
                                            value={ticketData[field]}
                                            onChange={handleChange}
                                            className="text-sm font-semibold text-black bg-transparent border-b border-gray-300 focus:outline-none focus:border-red-600 max-w-[4rem] text-center"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 pt-4 border-t-2 border-black text-center">
                                <p className="text-xs text-gray-600">Please arrive 15 minutes before departure. Thank you for choosing SwiftRide Express!</p>
                            </div>

                            <div className="mt-3 flex justify-center">
                                <div className="bg-gray-100 px-4 py-1 rounded border border-black content-center">
                                    <p className="text-xs font-mono text-black p-1">||||| |||| |||| ||||| ||||</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-center space-x-4">
                            <Button
                                onClick={handleSave}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 flex items-center transition duration-300 rounded-md"
                            >
                                Save Changes
                            </Button>

                            <Button
                                disabled
                                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 flex items-center transition duration-300 rounded-md"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Download Ticket
                            </Button>

                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Playground;