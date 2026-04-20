import { motion } from 'framer-motion';
import { Phone, MessageCircle, MoreVertical, Clock } from 'lucide-react';
import type { Booking } from '../../types';
import { formatDate, formatCurrency, getInitials } from '../../lib/utils';

interface BookingCardProps {
  booking: Booking;
  index?: number;
}

const statusConfig = {
  paid: { label: 'Payé', class: 'bg-emerald-100 text-emerald-700' },
  confirmed: { label: 'Confirmé', class: 'bg-blue-100 text-blue-700' },
  pending: { label: 'En attente', class: 'bg-amber-100 text-amber-700' },
  cancelled: { label: 'Annulé', class: 'bg-red-100 text-red-600' },
};

export function BookingCard({ booking, index = 0 }: BookingCardProps) {
  const status = statusConfig[booking.status];

  return (
    <motion.div
      className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      whileHover={{ y: -1 }}
    >
      <div className="flex items-center gap-3">
        {/* Client avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {getInitials(booking.client_name)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-espresso text-sm">{booking.client_name}</p>
            <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${status.class}`}>
              {status.label}
            </span>
          </div>
          <p className="text-xs text-gray-500 truncate">{booking.service.name}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Clock className="w-3 h-3 text-gray-300" />
            <p className="text-xs text-gray-400 capitalize">
              {formatDate(booking.date)} à {booking.time}
            </p>
          </div>
        </div>

        {/* Amount */}
        <div className="text-right flex-shrink-0">
          <p className="font-bold text-espresso">{formatCurrency(booking.deposit)}</p>
          <p className="text-xs text-gray-400">acompte</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Appeler"
          >
            <Phone className="w-4 h-4 text-gray-400" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Message"
          >
            <MessageCircle className="w-4 h-4 text-gray-400" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Plus d'actions"
          >
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
